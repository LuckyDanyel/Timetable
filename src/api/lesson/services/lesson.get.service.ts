import { HttpStatus, Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from '../lesson.entity';
import { LessonInfo } from "src/api/lessonInfo/lessonInfo.entity";

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
        .leftJoinAndSelect("lesson.lessonInfo", "lessonInfo")
        .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
        .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
        .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
        .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
        .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
        .getMany()

        const { studyPlan } = await 
        getManager().getRepository(LessonInfo)
        .createQueryBuilder('lessonInfo')
        .leftJoinAndSelect("lessonInfo.studyPlan", "metadata")
        .getOne()
       
        return {
            studyPlan,
            massiveLessonGroup
        }
    }
    
}