import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./teacher.enity";
import { Institute } from "../institutes/institutes.enity";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";


@Module({
    imports: [TypeOrmModule.forFeature([Institute, Teacher])],
    controllers: [TeacherController],
    providers: [TeacherService],
})
export class TeacherModule{}