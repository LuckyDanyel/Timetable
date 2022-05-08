import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyPlan } from "./studyPlan.entity";
import { Subject } from "../subject/subject.entity";
import { StudyPlanController } from "./studyPlan.controller";
import { StudyPlanService } from "./studyPlan.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subject, StudyPlan])],
    controllers: [StudyPlanController],
    providers: [StudyPlanService],
})
export class SubjectModule{}