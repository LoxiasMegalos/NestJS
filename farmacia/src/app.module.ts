import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/modules/categoria.module';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/modules/produto.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'gen123',
    database: 'db_farmacia',
    entities: [Produto, Categoria],
    synchronize: true
  }),
  ProdutoModule, CategoriaModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
