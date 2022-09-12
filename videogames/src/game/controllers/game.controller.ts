import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { VideoGames } from "../entities/game.entity";
import { GameService } from "../service/game.service";
import { DeleteResult} from "typeorm";

@Controller('/jogo')
export class GameController{
    constructor(
        private readonly service: GameService
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() game: VideoGames): Promise<VideoGames>{
        return this.service.create(game)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<VideoGames[]> {
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<VideoGames> {
        return this.service.findById(id)
    }

    @Get('/busca/:palavra')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('palavra') palavra: string): Promise<VideoGames[]> {
        return this.service.findByTitulo(palavra)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() game: VideoGames): Promise<VideoGames> {
        return this.service.update(game)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }

}