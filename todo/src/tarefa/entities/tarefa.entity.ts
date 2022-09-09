import { IsNotEmpty, MaxLength } from "class-validator";
import { repeat } from "rxjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_tarefa'})
export class Tarefa {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    nome: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length:500})
    descricao: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length:500})
    responsavel: string

    @Column()
    data: Date

    @Column()
    status: boolean

}