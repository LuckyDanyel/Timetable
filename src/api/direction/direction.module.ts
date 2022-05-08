import { Module } from "@nestjs/common";
import { Direction } from "./direction.enity";
import { Institute } from "../institutes/institutes.enity";
import { DirectionController } from "./direction.controller";
import { DirectionService } from "./direction.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Direction, Institute])],
    controllers: [DirectionController],
    providers: [DirectionService],
})
export class DirectionModule{}