import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { Direction } from "../direction/direction.entity";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { Lesson } from "../lesson/lesson.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Direction, Group, Lesson, LessonInfo])],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule{}