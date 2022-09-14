
import { InjectRepository } from "@nestjs/typeorm";
import { Medico } from "../entities/medico.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Cadastro } from "src/cadastro/entities/cadastro.entity";
import { CadastroTemp } from "src/cadastrotemp/entities/cadastroTemp.entity";

@Injectable()
export class MedicoService{
    
    constructor(
        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,
    ){}

    /*
    async createMedico(cadastroTemp : CadastroTemp): Promise<Medico>{

        let cadastro : Cadastro = new Cadastro()
        let medico : Medico = new Medico()
        
        cadastro.email = cadastroTemp.email
        cadastro.nome = cadastroTemp.nome
        cadastro.cpf = cadastroTemp.cpf
        cadastro.sobrenome = cadastroTemp.sobrenome
        cadastro.senha = cadastroTemp.senha
        
        medico.crm = cadastroTemp.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro
     
        return this.medicoRepository.save(medico)
    }
    */
    
    async findAll(): Promise<Medico[]>{
        return this.medicoRepository.find({
            relations:{
                cadastro: true,
                postagens: true,
            }
        })
    }

    async findById(id: number): Promise<Medico>{
        let medico_search = await this.medicoRepository.findOne({
            where:{
                id
            },relations:{
                cadastro: true,
                postagens: true,
            }
        })

        if(!medico_search){
            throw new HttpException('Medico nao encontrado no sistema', HttpStatus.NOT_FOUND)
        }

        return medico_search
    }

}