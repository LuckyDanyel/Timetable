import { Module } from "@nestjs/common";
import { Institute } from "./institutes.entity";
import { InstitutesController } from "./institutes.controller";
import { InstituteService } from "./istitutes.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Institute])],
    controllers: [InstitutesController],
    providers: [InstituteService],
})
export class InstituteModule{}