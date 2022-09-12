import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async create(categoria: Categoria): Promise<Categoria>{
        return this.categoriaRepository.save(categoria)
    }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            relations: {
                tarefas: true
            }
        })
    }

    async findById(id: number): Promise<Categoria>{
        let categoriaBuscada = await this.categoriaRepository.findOne({
            where: {
                id
            }, relations: {
                tarefas: true
            }
        })

        if(!categoriaBuscada){
            throw new HttpException('Categoria nao encontrada', HttpStatus.NOT_FOUND)
        }

        return categoriaBuscada
    }

    async findByDesc(descricao: string): Promise<Categoria[]>{
        return this.categoriaRepository.find({
            where : {
                descricao: ILike(`%${descricao}%`)
            }, relations: {
                tarefas: true
            }
        })
    }

    async delete(id: number): Promise<DeleteResult>{
        
        let categoriaDeletada = this.findById(id)

        if(!categoriaDeletada){
            throw new HttpException('Categoria nao encontrada', HttpStatus.NOT_FOUND)
        }

        return this.categoriaRepository.delete(id)
    }

    async update(categoria: Categoria): Promise<Categoria>{

        let categoriaAtualizar = this.findById(categoria.id)

        if(!categoriaAtualizar || !categoria.id){
            throw new HttpException('Categoria nao encontrada', HttpStatus.NOT_FOUND)
        }

        return this.categoriaRepository.save(categoria)
    }
}