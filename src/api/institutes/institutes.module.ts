import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Institute } from "./institutes.entity";
import { InstitutesController } from "./institutes.controller";
import { InstituteService } from "./istitutes.service";
import { PeriodsService } from "../periods/periods.service";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { TypeLesson } from "../typeLesson/typeLesson.entity";
import { Periods } from "../periods/periods.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Institute, Periods, TypeLesson])],
    controllers: [InstitutesController],
    providers: [InstituteService, PeriodsService, TypeLessonService],
})
export class InstituteModule{}