import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_jogos_jogados'})
export class VideoGames{

    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({nullable: false, length: 100})
    titulo: string

    @IsNotEmpty()
    dataLancamento: Date

    @IsNotEmpty()
    @MaxLength(100)
    @Column({nullable: false})
    nota: number

    @IsNotEmpty()
    @MaxLength(1000)
    @Column({nullable: false, length: 1000})
    review: string
}