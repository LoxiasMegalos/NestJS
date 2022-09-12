import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameController } from "../controllers/game.controller";
import { VideoGames } from "../entities/game.entity";
import { GameService } from "../service/game.service";

@Module({
    imports: [TypeOrmModule.forFeature([VideoGames])],
    providers: [GameService],
    controllers: [GameController],
    exports: [TypeOrmModule]
}) export class GameModule {}