import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'dm_postagens'})
export class Postagem {

    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({nullable: false, length: 100})
    nome_medico: string


    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    titulo: string

    @IsNotEmpty()
    @MaxLength(3000)
    @Column({nullable: false, length: 3000})
    conteudo: string    

    @MaxLength(500)
    @Column({length: 500})
    link_anexo: string

    @Column()
    data_postagem: Date
}