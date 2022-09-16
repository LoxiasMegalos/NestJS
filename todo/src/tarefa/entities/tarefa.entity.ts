import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity({name: 'tb_tarefa'})
export class Tarefa {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length:500})
    @ApiProperty()
    descricao: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length:500})
    @ApiProperty()
    responsavel: string

    @Column()
    @ApiProperty()
    data: Date

    @Column()
    @ApiProperty()
    status: boolean

    @ManyToOne( () => Categoria, (categoria) => categoria.tarefas, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Categoria})
    categoria: Categoria
}