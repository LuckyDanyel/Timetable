import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeLessonService } from "./typeLesson.service";
import { TypeLesson } from "./typeLesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TypeLesson])],
    controllers: [],
    providers: [TypeLessonService],
})
export class TypeLessonModule{}