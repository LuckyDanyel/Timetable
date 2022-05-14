import { Module } from "@nestjs/common";
import { Direction } from "./direction.entity";
import { Institute } from "../institutes/institutes.entity";
import { StudyPlan } from "../studyPlan/studyPlan.entity";
import { DirectionController } from "./direction.controller";
import { DirectionService } from "./direction.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Direction, Institute, StudyPlan])],
    controllers: [DirectionController],
    providers: [DirectionService],
})
export class DirectionModule{}