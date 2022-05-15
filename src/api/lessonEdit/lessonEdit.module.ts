import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonEditController } from "./lessonEdit.controller";

import { LessonEditService } from "./lessonEdit.service";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { LessonInfoGetService } from "../lessonInfo/services/lessonInfo.get.service";
import { BuildingService } from "../building/building.service";
import { AudienceService } from "../audience/audience.service";
import { LessonGetService } from "../lesson/services/lesson.get.service";

import { Audience } from "../audience/audience.entity";
import { TypeLesson } from "../typeLesson/typeLesson.entity";
import { Building } from "../building/building.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";
import { Lesson } from "../lesson/lesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TypeLesson, LessonInfo, Audience, Building, Lesson])],
    controllers: [LessonEditController],
    providers: [LessonEditService, TypeLessonService, LessonInfoGetService, AudienceService, BuildingService, LessonGetService],
})
export class LessonEditModule{}