import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('To-do List')
    .setDescription('Projeto Lista de Tarefas')
    .setContact(
      'Generation Brasil',
      'https://loxiasmegalos.github.io/Apresentacao/',
      'murillo.alkantara@gmail.com'
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  
  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
