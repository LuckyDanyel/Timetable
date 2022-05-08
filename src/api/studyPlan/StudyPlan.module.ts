import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyPlanController } from "./studyPlan.controller";
import { StudyPlanService } from "./studyPlan.service";
import { StudyPlan } from "./studyPlan.entity";
import { Subject } from "../subject/subject.entity";
import { Direction } from "../direction/direction.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subject, StudyPlan, Direction])],
    controllers: [StudyPlanController],
    providers: [StudyPlanService],
})
export class StudyPlanModule{}