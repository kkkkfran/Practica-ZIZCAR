import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { Record } from './records/entities/record.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configuración de la Base de Datos (Laragon)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // Usuario por defecto de Laragon
      password: '',          // Contraseña vacía por defecto
      database: 'test_programacion', // ¡Debe coincidir con la que creaste en HeidiSQL!
      entities: [Record],    // Aquí registramos la entidad que creaste
      synchronize: true,     // Crea la tabla automáticamente si no existe
    }),
    RecordsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}