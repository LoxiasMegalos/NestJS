import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoGames } from './game/entities/game.entity';
import { GameModule } from './game/modules/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'gen123',
      database: 'db_games',
      entities: [VideoGames],
      synchronize: true
    }),
    GameModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
