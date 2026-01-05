import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import * as fs from 'fs';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  // --- CRUD MANUAL ---

  async create(createRecordDto: any) {
    const newRecord = this.recordsRepository.create(createRecordDto);
    return this.recordsRepository.save(newRecord);
  }

  async update(id: number, updateRecordDto: any) {
    const record = await this.recordsRepository.findOneBy({ id });
    if (!record) throw new NotFoundException('Registro no encontrado');

    this.recordsRepository.merge(record, updateRecordDto);
    return this.recordsRepository.save(record);
  }

  async remove(id: number) {
    const result = await this.recordsRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Registro no encontrado');

    return { message: 'Eliminado correctamente' };
  }

  async findAll() {
    return this.recordsRepository.find({ order: { id: 'ASC' } });
  }

  // --- INGESTA DE PDF + AUDITORÍA ---
  async ingestData() {
    try {
      const pdfPath = '../data/data.pdf';
      console.log('Ruta del PDF:', pdfPath);

      if (!fs.existsSync(pdfPath)) {
        throw new Error('El archivo PDF no existe.');
      }

      const dataBuffer = fs.readFileSync(pdfPath);

      const pdfModule = require('pdf-parse');
      const pdfParse = pdfModule.default ?? pdfModule;

      const data = await pdfParse(dataBuffer);

      if (!data?.text || data.text.trim().length === 0) {
        throw new Error('El PDF está vacío.');
      }

      const lines = data.text.split('\n');
      let count = 0;

      const lineRegex =
        /(INV-[\d-]+)\s*(\d{2}-\d{2}-\d{4})\s*([A-Za-zÁÉÍÓÚáéíóú]+)\s*\$\s*([\d.]+)\s*(activo|pendiente|cancelado|completado)\s*(.+)/i;

      for (const line of lines) {
        const cleanLine = line.trim();
        if (!cleanLine.startsWith('INV-')) continue;

        const match = cleanLine.match(lineRegex);
        if (!match) continue;

        const [
          _,
          rawId,
          rawDate,
          rawCategory,
          rawAmount,
          rawStatus,
          rawDesc,
        ] = match;

        const amount = parseFloat(rawAmount.replace(/\./g, ''));

        let date = rawDate;
        if (rawDate.includes('-')) {
          const [day, month, year] = rawDate.split('-');
          date = `${year}-${month}-${day}`;
        }

        const existing = await this.recordsRepository.findOneBy({
          sourceId: rawId,
        });

        await this.recordsRepository.save({
          id: existing ? existing.id : undefined,
          sourceId: rawId,
          date,
          category: rawCategory,
          amount,
          status: rawStatus.toLowerCase(),
          description: rawDesc.trim(),
        });

        count++;
      }

      // ===============================
      // AUDITORÍA: JSON + CSV
      // ===============================

      const rawOutputPath =
        '../data/raw.json';
      const normalizedOutputPath =
        '../data/normalized.json';

      const allRecords = await this.recordsRepository.find();

      fs.writeFileSync(
        rawOutputPath,
        JSON.stringify({ rawText: data.text }, null, 2),
      );

      fs.writeFileSync(
        normalizedOutputPath,
        JSON.stringify(allRecords, null, 2),
      );

      // ---- CSV ----
      const csvOutputPath =
        '../data/normalized.csv';
      const rawCsvPath =
        '../data/raw.csv';

      const csvHeader =
        'id,sourceId,date,category,amount,status,description\n';

      const csvRows = allRecords
        .map(
          (r) =>
            `${r.id},${r.sourceId},${r.date},${r.category},${r.amount},${r.status},"${r.description}"`,
        )
        .join('\n');

      fs.writeFileSync(csvOutputPath, csvHeader + csvRows);

      const rawContentEscaped = data.text.replace(/"/g, '""');
      fs.writeFileSync(rawCsvPath, `raw_text\n"${rawContentEscaped}"`);

      console.log('Archivos JSON y CSV generados correctamente');

      return {
        message: 'Datos procesados y exportados correctamente',
        registros_procesados: count,
      };
    } catch (error) {
      console.error('ERROR AL PROCESAR PDF:', error);
      throw error;
    }
  }
}
