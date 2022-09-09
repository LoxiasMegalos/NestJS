import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";

@Injectable()
export class TarefaService {

    constructor(
        @InjectRepository(Tarefa)
        private tarefaRepository: Repository<Tarefa>
    ){}

    async findAll(): Promise<Tarefa[]> {
        return this.tarefaRepository.find()
    }

    async findById(id: number): Promise<Tarefa> {
        let tarefa = await this.tarefaRepository.findOne({
            where: {
                id
            }
        })

        if(!tarefa){
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND)
        } 

        return tarefa
    }

    async findByNome(nome: string): Promise<Tarefa[]> {

        return this.tarefaRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        })
    }

    async findByResp(responsavel: string): Promise<Tarefa[]> {
        return this.tarefaRepository.find({
            where:{
                responsavel: `${responsavel}`
            }
        })
    }

    async create(tarefa: Tarefa): Promise<Tarefa>{
        return this.tarefaRepository.save(tarefa)
    }

    async update(tarefa: Tarefa): Promise<Tarefa>{
        let tarefaUpdate = await this.findById(tarefa.id)

        if(!tarefaUpdate || !tarefa.id){
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND)
        }

        return this.tarefaRepository.save(tarefa)
    }

    async delete(id: number): Promise<DeleteResult>{

        let tarefaDelete = await this.findById(id)

        if(!tarefaDelete){
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND)
        }

        return this.tarefaRepository.delete(id)
    }
}