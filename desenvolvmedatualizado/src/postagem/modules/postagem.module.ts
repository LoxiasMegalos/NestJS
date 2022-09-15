import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comentario } from "../../comentario/entities/comentario.entity";
import { PostagemController } from "../controllers/postagem.controller";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem,Comentario])],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})

export class PostagemModule { }