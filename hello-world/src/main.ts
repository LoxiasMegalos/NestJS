import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Await - espera criar a aplicação para em seguida definir a porta em que será alocada
  const app = await NestFactory.create(AppModule); 
  // app.listen(3000) difine a porta 3000 na qual a aplicação será criada.
  await app.listen(3000);
}
bootstrap();
