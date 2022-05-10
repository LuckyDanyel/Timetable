import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { Teacher } from "./teacher.entity";
import { Institute } from "../institutes/institutes.entity";
import { Lesson } from "../lesson/lesson.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Institute, Teacher, Lesson])],
    controllers: [TeacherController],
    providers: [TeacherService],
})
export class TeacherModule{}