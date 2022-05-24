import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DayWeekController } from "./dayWeek.controller";
import { DayWeekService } from "./dayWeek.service";
import { DayWeek } from "./dayWeek.entity";
import { Lesson } from "../lesson/lesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, DayWeek])],
    controllers: [DayWeekController],
    providers: [DayWeekService],
})
export class DayWeekModule{}