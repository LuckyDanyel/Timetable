import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonController } from "./lesson.controller";
import { LessonCreateService } from "./services/lesson.create.service";
import { Lesson } from "./lesson.entity";
import { Group } from "../group/group.entity";
import { Subject } from "../subject/subject.entity";
import { Teacher } from "../teacher/teacher.entity";
import { Periods } from "../periods/periods.entity";
import { Audience } from "../audience/audience.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, Group, Subject, Teacher, Periods, Audience])],
    controllers: [LessonController],
    providers: [LessonCreateService],
})
export class AudienceModule{}