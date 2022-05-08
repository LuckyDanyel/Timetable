import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./subject.enity";
import { Teacher } from "../teacher/teacher.enity";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subject, Teacher])],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule{}