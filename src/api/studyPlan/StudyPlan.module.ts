import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyPlanController } from "./studyPlan.controller";
import { StudyPlanService } from "./services/studyPlan.create.service";
import { GetStudyPlanService } from "./services/studyPlan.get.service";
import { StudyPlan } from "./studyPlan.entity";
import { Subject } from "../subject/subject.entity";
import { Direction } from "../direction/direction.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subject, StudyPlan, Direction, LessonInfo])],
    controllers: [StudyPlanController],
    providers: [StudyPlanService, GetStudyPlanService],
})
export class StudyPlanModule{}