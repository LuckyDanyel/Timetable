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
    
    // async getLessons(idLessonInfo: string): Promise<any> {
    //     const massiveLessonGroup = await 
    //     this.lessonRepository.createQueryBuilder('lesson')
    //     .leftJoinAndSelect("lesson.lessonInfo", "lessonInfo")
    //     .leftJoinAndMapOne("lessonInfo.studyPlan", "lessonInfo.studyPlan", "studyPlan")
    //     .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
    //     .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
    //     .leftJoinAndMapOne("lesson.group", "lesson.group", "group")
    //     .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
    //     .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
    //     .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
    //     .getMany()
    //     return massiveLessonGroup;
    // }

    async getLessons(idLessonInfo: string): Promise<any> {
        const massiveLessonGroup = await 
        this.lessonRepository.createQueryBuilder('lesson')
        .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
        .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
        .leftJoinAndMapOne("lesson.lessonInfo", "lesson.lessonInfo", "lessonInfo")
        .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
        .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
        .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
        .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
        .getMany()

        const lessonInfo = await 
        getManager().getRepository(LessonInfo)
        .createQueryBuilder('lessonInfo')
        .leftJoinAndMapOne("lessonInfo.group", "lessonInfo.group", "lesson_info")
        .leftJoinAndMapOne("lessonInfo.studyPlan", "lessonInfo.studyPlan", "study_plan")
        .where("lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
        .getOne()

        return {
            lessonInfo,
            massiveLessonGroup
        }
    }
    
}