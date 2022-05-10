import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";
import { Teacher } from "../teacher/teacher.entity";
import { Institute } from "../institutes/institutes.entity";
import { Lesson } from "../lesson/lesson.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Subject, Teacher, Institute, Lesson])],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule{}