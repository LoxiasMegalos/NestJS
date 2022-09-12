import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";

@Controller('/postagem')
export class PostagemController {
    constructor(private readonly service: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.service.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Postagem): Promise<Postagem>{
        return this.service.create(post)
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number){
        return this.service.findById(id)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.service.delete(id)
    }
    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: Postagem): Promise<Postagem>{
        return this.service.update(post)
    }

    @Get('/busca/:palavra')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('palavra') palavra: string): Promise<Postagem[]>{
        return this.service.findByNome(palavra)
    }
}