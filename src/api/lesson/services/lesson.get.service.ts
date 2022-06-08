import { HttpStatus, Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from '../lesson.entity';
import { LessonInfo } from "src/api/lessonInfo/lessonInfo.entity";
import { StudyPlan } from "src/api/studyPlan/studyPlan.entity";
import { Group } from "src/api/group/group.entity";
import lessonGroupBusy from "../converters/lessonGroupBusy";

@Injectable()
export class LessonGetService {

    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ){}
    
    async getLessons(idLessonInfo: string): Promise<any> {
        try {
            const lessonInfo = await 
            getManager().getRepository(LessonInfo)
            .createQueryBuilder('lessonInfo')
            .leftJoinAndMapOne("lessonInfo.group", "lessonInfo.group", "lesson_info")
            .leftJoinAndMapOne("lessonInfo.studyPlan", "lessonInfo.studyPlan", "study_plan")
            .leftJoinAndMapOne("study_plan.direction", "study_plan.direction", "direction")
            .leftJoinAndMapOne("direction.institute", "direction.institute", "institute")
            .where("lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
            .getOne()

            if(!lessonInfo) throw 'Нет такой информации о расписанни';

            const massiveLessonGroup = await 
            this.lessonRepository.createQueryBuilder('lesson')
            .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
            .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
            .leftJoinAndMapOne("lesson.typeLesson", "lesson.typeLesson", "typeLesson")
            .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
            .leftJoinAndMapOne("audience.building", "audience.building", "building")
            .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
            .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
            .andWhere("lesson.date is not null")
            .getMany()

            const massiveLessonGroupDouble = await 
            this.lessonRepository.createQueryBuilder('lesson')
            .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
            .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
            .leftJoinAndMapOne("lesson.typeLesson", "lesson.typeLesson", "typeLesson")
            .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
            .leftJoinAndMapOne("audience.building", "audience.building", "building")
            .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
            .where("lesson.lessonInfo.id = :idLessonInfo", { idLessonInfo: idLessonInfo })
            .andWhere("lesson.date is null")
            .getMany()

            return {
                lessonInfo,
                massiveLessonGroup,
                massiveLessonGroupDouble,
            }   
        } catch (error) {
            return error;
        }
    }

    async getLessonByDate(dateStroke: string): Promise<Lesson[]> {
        const result = await this.lessonRepository.find({ date: dateStroke })
        return result;
    }

    async getLessonsByIndexDayAndPeriod(dataParams: any): Promise<Lesson[]> {
        const { indexDay, parity, periodId, lessonInfoId } = dataParams;

        const result = 
        await this.lessonRepository.createQueryBuilder('lesson')
        .leftJoinAndMapOne("lesson.teacher", "lesson.teacher", "teacher")
        .leftJoinAndMapOne("lesson.typeLesson", "lesson.typeLesson", "typeLesson")
        .leftJoinAndMapOne("lesson.subject", "lesson.subject", "subject")
        .leftJoinAndMapOne("lesson.audience", "lesson.audience", "audience")
        .leftJoinAndMapOne("lesson.periods", "lesson.periods", "periods")
        .leftJoinAndMapOne("lesson.lessonInfo", "lesson.lessonInfo", "lessonInfo")
        .leftJoinAndMapOne("lessonInfo.group", "lessonInfo.group", "group")
        .leftJoinAndMapOne("group.direction", "group.direction", "direction")
        .where("lesson.dayIndex = :indexDay", { indexDay })
        .andWhere("lesson.parity = :parity", { parity })
        .andWhere("lesson.periods.id = :periodId", { periodId })
        .andWhere("lesson.lessonInfo.id != :lessonInfoId", { lessonInfoId })
        .getMany()
        return lessonGroupBusy(result);
    }
    
}