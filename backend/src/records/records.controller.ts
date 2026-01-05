import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { AuthGuard } from '@nestjs/passport'; // <--- El Candado

@Controller('records')
@UseGuards(AuthGuard('jwt')) // <--- ESTO PROTEGE TODO EL CONTROLADOR
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @Post('ingest')
  ingestData() {
    return this.recordsService.ingestData();
  }

  // --- NUEVOS ENDPOINTS CRUD ---
  @Post()
  create(@Body() body: any) {
    return this.recordsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.recordsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
}