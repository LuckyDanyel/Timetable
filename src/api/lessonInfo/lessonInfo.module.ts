import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonInfoController } from "./lessonInfo.controller";
import { LessonInfoService } from "./lessonInfo.service";
import { LessonInfo } from "./lessonInfo.entity";
import { Lesson } from "../lesson/lesson.entity";
import { Group } from "../group/group.entity";
import { StudyPlan } from "../studyPlan/studyPlan.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, LessonInfo, Group, StudyPlan])],
    controllers: [LessonInfoController],
    providers: [LessonInfoService],
})
export class AudienceModule{}