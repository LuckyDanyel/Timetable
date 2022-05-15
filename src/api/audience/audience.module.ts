import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudienceController } from "./audience.controller";
import { AudienceService } from "./audience.service";
import { Audience } from "./audience.entity";
import { Lesson } from "../lesson/lesson.entity";
import { Building } from "../building/building.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Audience, Lesson, Building])],
    controllers: [AudienceController],
    providers: [AudienceService],
})
export class AudienceModule{}