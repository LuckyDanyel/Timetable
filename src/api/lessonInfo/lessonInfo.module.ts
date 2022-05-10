import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonInfoController } from "./lessonInfo.controller";
import { LessonInfoCreateService } from "./services/lessonInfo.create.service";
import { LessonInfoGetService } from "./services/lessonInfo.get.service";
import { LessonInfo } from "./lessonInfo.entity";
import { Lesson } from "../lesson/lesson.entity";
import { Group } from "../group/group.entity";
import { StudyPlan } from "../studyPlan/studyPlan.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, LessonInfo, Group, StudyPlan])],
    controllers: [LessonInfoController],
    providers: [LessonInfoCreateService, LessonInfoGetService],
})
export class LessonInfoModule{}