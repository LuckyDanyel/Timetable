import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonController } from "./lesson.controller";
import { LessonGetService } from "./services/lesson.get.service";
import { LessonCreateService } from "./services/lesson.create.service";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { PeriodsService } from "../periods/periods.service";
import { LessonDeleteService } from './services/lesson.delete.service';


import { Lesson } from "./lesson.entity";
import { Subject } from "../subject/subject.entity";
import { Teacher } from "../teacher/teacher.entity";
import { Periods } from "../periods/periods.entity";
import { Audience } from "../audience/audience.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";
import { TypeLesson } from "../typeLesson/typeLesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, Subject, Teacher, Periods, Audience, LessonInfo, TypeLesson])],
    controllers: [LessonController],
    providers: [LessonCreateService, LessonGetService, TypeLessonService, PeriodsService, LessonDeleteService],
})
export class LessonModule{}