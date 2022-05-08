import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.entity";
import { Group } from "../group/group.entity";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";

@Module({
    imports: [TypeOrmModule.forFeature([Student, Group])],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule{}