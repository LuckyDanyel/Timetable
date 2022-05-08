import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.enity";
import { Group } from "../group/group.enity";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";

@Module({
    imports: [TypeOrmModule.forFeature([Student, Group])],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule{}