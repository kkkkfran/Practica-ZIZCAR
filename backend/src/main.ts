import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Activar CORS (Para que el Frontend tenga permiso de pedir datos)
  app.enableCors(); 
  
  // 2. Cambiar puerto a 3001 (Para dejarle el 3000 libre al Frontend)
  await app.listen(3001); 
}
bootstrap();