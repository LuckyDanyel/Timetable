import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudienceController } from "./audience.controller";
import { AudienceService } from "./audience.service";
import { Audience } from "./audience.entity";
import { Lesson } from "../lesson/lesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Audience, Lesson])],
    controllers: [AudienceController],
    providers: [AudienceService],
})
export class AudienceModule{}