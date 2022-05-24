import { HttpStatus, Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from '../lesson.entity';
import { LessonInfo } from "src/api/lessonInfo/lessonInfo.entity";
import { StudyPlan } from "src/api/studyPlan/studyPlan.entity";
import { Group } from "src/api/group/group.entity";

@Injectable()
export class LessonGetService {

    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ){}
    
    async getLessons(idLessonInfo: string): Promise<any> {

        const massiveLessonGroup = await 
        this.lessonRepository.createQueryBuilder('lesson')
        .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
        .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
        .leftJoinAndMapOne("lesson.typeLesson", "lesson.typeLesson", "typeLesson")
        .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
        .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
        .leftJoinAndMapOne("lesson.dayWeek", "lesson.dayWeek", "dayWeek")
        .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
        .getMany()

        const lessonInfo = await 
        getManager().getRepository(LessonInfo)
        .createQueryBuilder('lessonInfo')
        .leftJoinAndMapOne("lessonInfo.group", "lessonInfo.group", "lesson_info")
        .leftJoinAndMapOne("lessonInfo.studyPlan", "lessonInfo.studyPlan", "study_plan")
        .leftJoinAndMapOne("study_plan.direction", "study_plan.direction", "direction")
        .leftJoinAndMapOne("direction.institute", "direction.institute", "institute")
        .where("lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
        .getOne()

        return {
            lessonInfo,
            massiveLessonGroup
        }
    }

    async getLessonByDate(dateStroke: string): Promise<Lesson[]> {
        const result = await this.lessonRepository.find({ date: dateStroke })
        return result;
    }
    
}