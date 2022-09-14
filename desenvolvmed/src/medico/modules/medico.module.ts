import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cadastro } from "src/cadastro/entities/cadastro.entity";
import { CadastroTemp } from "src/cadastrotemp/entities/cadastroTemp.entity";
import { MedicoController } from "../controllers/medico.controller";
import { Medico } from "../entities/medico.entity";
import { MedicoService } from "../services/medico.service";


@Module({
    imports: [TypeOrmModule.forFeature([Medico, Cadastro, CadastroTemp])],
    providers: [MedicoService],
    controllers: [MedicoController],
    exports: [TypeOrmModule]
}) 

export class MedicoModule {}