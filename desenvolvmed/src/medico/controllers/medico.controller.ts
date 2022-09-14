import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Medico } from "../entities/medico.entity";
import { MedicoService } from "../services/medico.service";


@Controller('/medico')
export class MedicoController{
    constructor(
        private readonly service : MedicoService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Medico[]>{
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Medico[]>{
        return this.service.findAll()
    }
}

