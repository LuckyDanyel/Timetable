import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Institute } from "./institutes.entity";
import { InstitutesController } from "./institutes.controller";
import { InstituteService } from "./istitutes.service";
import { PeriodsService } from "../periods/periods.service";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { TypeLesson } from "../typeLesson/typeLesson.entity";
import { Periods } from "../periods/periods.entity";
import { DayWeek } from "../dayWeek/dayWeek.entity";
import { DayWeekService } from "../dayWeek/dayWeek.service";

@Module({
    imports: [TypeOrmModule.forFeature([Institute, Periods, TypeLesson, DayWeek])],
    controllers: [InstitutesController],
    providers: [InstituteService, PeriodsService, TypeLessonService, DayWeekService],
})
export class InstituteModule{}