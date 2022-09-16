import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefa.service";


@ApiTags('Tarefa')
@Controller('/tarefa')
export class TarefaController {
    constructor(private readonly service: TarefaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tarefa[]>{
        return this.service.findAll()
    }

    @Get('/:id') // tarefa/id
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa>{
        return this.service.findById(id)
    }

    @Get('/nome/:nome') //tarefa/nome/nomeBuscado
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Tarefa[]>{
        return this.service.findByNome(nome)
    }

    @Get('/resp/:nome') //tarefa/resp/nomeBuscado
    @HttpCode(HttpStatus.OK)
    findByResponsavel(@Param('nome') nome: string): Promise<Tarefa[]>{
        return this.service.findByResp(nome)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tarefa: Tarefa): Promise<Tarefa> {
        return this.service.create(tarefa)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tarefa: Tarefa): Promise<Tarefa>{
        return this.service.update(tarefa)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.service.delete(id)
    }

}