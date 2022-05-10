import { Module } from "@nestjs/common";
import { Audience } from "./audience.entity";
import { AudienceController } from "./audience.controller";
import { AudienceService } from "./audience.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Audience])],
    controllers: [AudienceController],
    providers: [AudienceService],
})
export class AudienceModule{}