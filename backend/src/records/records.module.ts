import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importante
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { Record } from './entities/record.entity'; // Importante

@Module({
  imports: [
    // Aquí es donde "registras" la entidad para que el servicio pueda usarla
    TypeOrmModule.forFeature([Record]), 
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}