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

  // 1. Crear manual
  async create(createRecordDto: any) {
    const newRecord = this.recordsRepository.create(createRecordDto);
    return this.recordsRepository.save(newRecord);
  }

  // 2. Editar
  async update(id: number, updateRecordDto: any) {
    // Buscamos por el ID numérico interno (no el sourceId)
    const record = await this.recordsRepository.findOneBy({ id });
    if (!record) throw new NotFoundException('Registro no encontrado');

    // Actualizamos solo los campos que vienen en el DTO
    this.recordsRepository.merge(record, updateRecordDto);
    return this.recordsRepository.save(record);
  }

  // 3. Eliminar
  async remove(id: number) {
    const result = await this.recordsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Registro no encontrado');
    return { message: 'Eliminado correctamente' };
  }

  // 4. Listar todos
  async findAll() {
    return this.recordsRepository.find({ order: { id: 'ASC' } });
  }

  // --- LÓGICA DE PDF (MEJORADA) ---
  
  async ingestData() {
    try {
      // Usamos la ruta absoluta que sabemos que funciona en tu PC
      const pdfPath = 'C:\\Users\\kaush\\Desktop\\practica_test\\data\\data.pdf';
      console.log('Ruta del PDF:', pdfPath);

      if (!fs.existsSync(pdfPath)) {
        throw new Error('El archivo PDF no existe en la ruta especificada.');
      }

      const dataBuffer = fs.readFileSync(pdfPath);
      
      // Carga robusta de la librería
      const pdfModule = require('pdf-parse');
      const pdfParse = pdfModule.default ?? pdfModule;

      console.log('Procesando PDF para corrección...');
      const data = await pdfParse(dataBuffer);

      if (!data?.text || data.text.trim().length === 0) {
        throw new Error('El PDF se leyó pero está vacío.');
      }

      const lines = data.text.split('\n');
      let count = 0;

      // --- REGEX MEJORADA ---
      // Separa explícitamente el estado de la descripción aunque estén pegados.
      const lineRegex = /(INV-[\d-]+)\s*(\d{2}-\d{2}-\d{4})\s*([A-Za-zÁÉÍÓÚáéíóú]+)\s*\$\s*([\d.]+)\s*(activo|pendiente|cancelado|completado)\s*(.+)/i;

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
          rawStatus, // Ahora esto vendrá limpio (ej: "activo")
          rawDesc,   // Y esto tendrá el resto (ej: "Compra de stock")
        ] = match;

        // Limpieza de monto
        const amount = parseFloat(rawAmount.replace(/\./g, ''));
        
        // Formato de fecha
        let date = rawDate;
        if (rawDate.includes('-')) {
          const [day, month, year] = rawDate.split('-');
          date = `${year}-${month}-${day}`;
        }

        // Buscamos si ya existe para ACTUALIZARLO (Corregir el error anterior)
        const existing = await this.recordsRepository.findOneBy({ sourceId: rawId });

        await this.recordsRepository.save({
          id: existing ? existing.id : undefined, // Si existe, usa su ID para sobrescribir
          sourceId: rawId,
          date,
          category: rawCategory,
          amount,
          status: rawStatus.toLowerCase(),
          description: rawDesc.trim(), // Limpiamos espacios sobrantes al inicio
        });
        
        count++;
      }

      console.log(`¡Proceso completado! ${count} registros procesados/corregidos.`);
      return { 
        message: 'Datos procesados y corregidos exitosamente', 
        registros_procesados: count 
      };

    } catch (error) {
      console.error('ERROR AL PROCESAR PDF:', error);
      throw error; // Lanzamos el error para que el frontend sepa que falló
    }
  }
}