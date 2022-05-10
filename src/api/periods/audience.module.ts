import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Periods } from "./periods.entity";
import { PeriodsController } from "./periods.controller";
import { PeriodsService } from "./periods.service";

@Module({
    imports: [TypeOrmModule.forFeature([Periods])],
    controllers: [PeriodsController],
    providers: [PeriodsService],
})
export class PeriodsModule{}