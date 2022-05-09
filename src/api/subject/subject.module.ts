import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { Teacher } from "../teacher/teacher.entity";
import { Institute } from "../institutes/institutes.entity";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subject, Teacher, Institute])],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule{}