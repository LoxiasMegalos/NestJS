import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ){}

    async create(postagem: Postagem): Promise<Postagem>{
        return this.postagemRepository.save(postagem)
    }

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find()
    }

    async findById(id: number): Promise<Postagem>{
        let post = this.postagemRepository.findOne({
            where: {
                id
            }
        })

        if(!post){
            throw new HttpException('Post nao encontrado!', HttpStatus.NOT_FOUND)
        }

        return post
    }

    async update(postagem: Postagem): Promise<Postagem>{

        let postagemUpdate = await this.findById(postagem.id)

        if(!postagemUpdate || !postagem.id){
            throw new HttpException('Post nao encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.postagemRepository.save(postagem)
    }

    async delete(id: number): Promise<DeleteResult>{

        let postagemDelete = await this.findById(id)

        if(!postagemDelete){
            throw new HttpException('Post nao encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.postagemRepository.delete(id)
    }

    async findByNome(palavra: string): Promise<Postagem[]>{

        return this.postagemRepository.find({
            where:{
                titulo: ILike(`%${palavra}%`)
            }
        })
    }
}  