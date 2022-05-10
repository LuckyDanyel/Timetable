import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Institute } from "./institutes.entity";
import { InstitutesController } from "./institutes.controller";
import { InstituteService } from "./istitutes.service";
import { PeriodsService } from "../periods/periods.service";
import { Periods } from "../periods/periods.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Institute, Periods])],
    controllers: [InstitutesController],
    providers: [InstituteService, PeriodsService],
})
export class InstituteModule{}