import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CadastroTemp } from "src/cadastrotemp/entities/cadastroTemp.entity";
import { Medico } from "src/medico/entities/medico.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { CadastroController } from "../controllers/cadastro.controller";
import { Cadastro } from "../entities/cadastro.entity";
import { CadastroService } from "../services/cadastro.service";

@Module({
    imports: [TypeOrmModule.forFeature([Cadastro, Paciente, Medico, CadastroTemp])],
    providers: [CadastroService],
    controllers: [CadastroController],
    exports: [TypeOrmModule]
}) export class CadastroModule {}