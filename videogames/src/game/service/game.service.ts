import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoGames } from "../entities/game.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class GameService{
    constructor(
        @InjectRepository(VideoGames) 
        private gameRepository: Repository<VideoGames>
    ){}

    async create(jogo: VideoGames): Promise<VideoGames> {
        return this.gameRepository.save(jogo)
    }

    async findAll(): Promise<VideoGames[]> {
        return this.gameRepository.find()
    }

    async findById(id: number): Promise<VideoGames> {
        let jogoProcurado = this.gameRepository.findOne({
            where: {
                id
            }
        })

        if(!jogoProcurado){
            throw new HttpException('Jogo nao encontrado', HttpStatus.NOT_FOUND)
        }

        return jogoProcurado
    }

    async findByTitulo(titulo: string): Promise<VideoGames[]> {
        return this.gameRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async delete(id: number): Promise<DeleteResult>{

        let jogoDeletar = this.findById(id)

        if(!jogoDeletar){
            throw new HttpException('Jogo nao encontrado', HttpStatus.NOT_FOUND)
        }

        return this.gameRepository.delete(id)
    }

    async update(game: VideoGames): Promise<VideoGames> {
        
        let jogoAtualizar = this.findById(game.id)

        if(!jogoAtualizar || !game.id){
            throw new HttpException('Jogo nao encontrado', HttpStatus.NOT_FOUND)
        }

        return this.gameRepository.save(game)
    }
}