# NestJS
Aprendendo Nest

<p>
Passo a passo - criação e edição de APIs utilizando NestJs

*Criação e configuração*

1 - Criar um novo projeto Nest - nest new *nome-do-projeto* <br>
2 - Acessar a pasta do novo projeto e realizar a instalação do ORM, SQL e o Validator <br>
3 - npm install --save @nestjs/typeorm mysql2 - MySQL e ORM <br>
4 - npm install --save class-validator class-transformer - Validators <br>

*Configurações Primárias no src/main.ts*

5 - src/main.ts - Modificar o fuso-horário e Habilitar o validator <br>
6 - process.env.TZ = '-03:00' - Ajustar o fuso-horário ao do Brasil <br>
7 - app.useGlobalPipes(new ValidationPipe()) - Ativando as validações <br>
8 - app.enableCors() <br>

*Criação do Schema/Database manual no SQL e inclusão no NestJs*

8 - Abrir MySQL Workbench - novo SQL File <br>
9 - Create database *nome-do-schema* - Criar ambiente para incluir as tabelas do projeto <br>
10 - use *nome-do-schema* - utilizar a schema criado no mysql <br>
11 - Configurar src/module.ts, remover controller e provider controllers: [], providers: [], <br>
12 - configurar imports: [ TypeOrmModule.forRoot ({ type: 'tipo do banco - mysql', host: 'endereço - localhost', port: padrao 3306 - verificar banco, username: 'root - verificar banco', password: 'senha do banco configurado do host', database: 'schema criado - db_projeto', entities: 'classe entity do projeto', synchronize: true/false}), ProjetoModule ], <br>
13 - Necessario criar src/nome-do-projeto, src/nome-do-projeto/entities, src/nome-do-projeto/modules para configurar o module principal <br>
14 - em entities criar projeto.entity.ts @Entity({name: 'nome da tabela'}) export class ProjetoNome { configurar colunas das tabelas, podendo ser numbers, strings ou Date, principais anotações: @PrimaryGeneratedColumn() - PK, @IsNotEmpty(), @MaxLength(100), @Column({nullable: false, length: 100})} <br>
15 - em modules criar projeto.module.ts @Module({imports:[TypeOrmModule.forFeature([Projeto])], providers:[ProjetoService], controllers:[ProjetoController], exports:[TypeOrmModule]}) export class ProjetoModule{}<br>
16 - Ao rodar o programa neste ponto com um npm run start:dev - a tabela definida no entity com name: já deve ter sido criada e pode ser acessada no workbench do mysql<br>

*Criação do service e controller da API - configuração*

17 - criar diretório src/projeto/controllers - mapeamento de requisições e src/projeto/service - construção das regras de negócio para as requisições<br>
18 - criar projeto.service.ts, utilizar anotação @Injectable() export class ProjetoService { construtor(@InjectableRepository(Projeto *Classe Entity*) private projetoRepository: Repository<Projeto>){} }<br>
19 - criar projeto.controller.ts, utilizar anotação @Controller('/projeto') export class ProjetoController {constructor(private readonly service: ProjetoService *Classe de serviço*){}}<br>
20 - iniciar a mapear post, put, delete, get no service e no controller<br>

*Criação das regras de negócios e funções assíncronas no service*

21 - async create(projeto: Projeto): Promise<Projeto>{return this.projetoRepository.save(projeto)}<br>
22 - async findAll(): Promise<Projeto[]>{return this.projetoRepository.find()}<br>
23 - async findById(id: numero): Promise<Projeto>{let projetoProcurado = await this.projetoRepository.findOne({where: {id}}) if(!projetoProcurado){throw new HttpException('Post nao encontrado!', HttpStatus.NOT_FOUND)} return projetoProcurado}<br>
24 - async findByNome(nome: string): Promise<Projeto[]>{return this.projetoRepository.find({where:{campoProcuradoDaTabela: ILike(`%${nome}%`)}})}<br>
25 - async delete(id: number): Promise<DeleteResult>{let projetoDeletar = await this.findById(id) if(!projetoDeletar){throw new HttpException('Nao encontrado!', HttpStatus.NOT_FOUND)} return this.projetoRepository.delete(id)}<br>
26 - async update(projeto: Projeto): Promise<Projeto>{let projetoAtualizar = await this.findById(projeto.id) if(!projetoAtualizar || !projeto.id){throw new HttpException('Projeto nao encontrado', HttpStatus.NOT_FOUND)} return this.projetoRepository.save(projeto)}<br>

*Mapeando requisições Http no controller*

27 - Anotações @Get(), caso busca for especifica, adicionar endereço após '/projeto', @Get('/:id') - resultando em 'localhost:3000/projeto/id'<br>
28 - Anotações @Post() e @Put() não precisam de endereço adicional, será passado um @Body no parâmetro da função.<br>
29 - Anotação @Delete('/:parametro') é necessário um parametro que foi definido em service para utilizá-lo, id, ou nome.<br>
30 - Validação @HttpCode necessária, apenas Delete @HttpCode(HttpStatus.NO_CONTENT), demais requisições @HttpCode(HttpStatus.OK)<br>
31 - Funções que requerem um parâmetro de busca utilizam anotações @Param('nomeParametro') nomeParametro: string, ou, @Param('nomeParametro', ParseIntPipe) nomeParametro: number<br>
32 - Todas funções return this.service.funcaoDoService(parametro se tiver)<br>

*Imports Fundamentais*

Controller
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";<br>
import { DeleteResult} from "typeorm";<br>

Service
import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";<br>
import { InjectRepository } from "@nestjs/typeorm";<br>
import { DeleteResult, ILike, Repository } from "typeorm";<br>

Entity
import { IsNotEmpty, Max, MaxLength } from "class-validator";<br>
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";<br>

Module
import { Module } from "@nestjs/common";<br>
import { TypeOrmModule } from "@nestjs/typeorm";<br>
</p>
