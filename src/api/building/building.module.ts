import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuildingController } from "./building.controller";
import { BuildingService } from "./building.service";
import { Building } from "./building.entity";
import { Audience } from "../audience/audience.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Building, Audience])],
    controllers: [BuildingController],
    providers: [BuildingService],
})
export class BuildingModule{}