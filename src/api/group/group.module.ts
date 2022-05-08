import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./group.enity";
import { Direction } from "../direction/direction.enity";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";

@Module({
    imports: [TypeOrmModule.forFeature([Direction, Group])],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule{}