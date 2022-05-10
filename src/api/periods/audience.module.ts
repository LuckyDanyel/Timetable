import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PeriodsController } from "./periods.controller";
import { PeriodsService } from "./periods.service";
import { Periods } from "./periods.entity";
import { Lesson } from "../lesson/lesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Periods, Lesson])],
    controllers: [PeriodsController],
    providers: [PeriodsService],
})
export class PeriodsModule{}