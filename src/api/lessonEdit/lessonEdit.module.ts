import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonEditController } from "./lessonEdit.controller";
import { LessonEditService } from "./lessonEdit.service";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { LessonInfoGetService } from "../lessonInfo/services/lessonInfo.get.service";
import { TypeLesson } from "../typeLesson/typeLesson.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TypeLesson, LessonInfo])],
    controllers: [LessonEditController],
    providers: [LessonEditService, TypeLessonService, LessonInfoGetService],
})
export class LessonEditModule{}