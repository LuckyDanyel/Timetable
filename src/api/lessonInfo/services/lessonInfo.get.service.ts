import { HttpStatus, Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonInfo } from '../lessonInfo.entity';
import { Institute } from "src/api/institutes/institutes.entity";
import { Direction } from "src/api/direction/direction.entity";
import { Group } from "src/api/group/group.entity";
import { StudyPlan } from "src/api/studyPlan/studyPlan.entity";
import { group } from "console";

@Injectable()
export class LessonInfoGetService {

    constructor(
        @InjectRepository(LessonInfo) private lessonInfoRepository: Repository<LessonInfo>,
    ){}
    
    async getLessonInfoForCreate(): Promise<any> {
        const manager = getManager();
        const dataInstitutes = await manager.find(Institute);

        const dataDirections = await manager.getRepository(Direction)
        .createQueryBuilder("direction")
        .leftJoinAndSelect("direction.institute", "metadata")
        .getMany()

        const dataGroup = await manager.getRepository(Group)
        .createQueryBuilder("group")
        .leftJoinAndSelect("group.direction", "metadata")
        .getMany()
        
        return {
            dataInstitutes,
            dataDirections,
            dataGroup,
        }
    }

    async getLessonInfo(): Promise<any> {
        const manager = getManager();
        const dataGroupOnLesonInfo = await manager.getRepository(LessonInfo)
        .createQueryBuilder("lesson_info")
        .leftJoinAndMapOne("lesson_info.studyPlan", "lesson_info.studyPlan", "study_plan")
        .leftJoinAndMapOne("lesson_info.group", "lesson_info.group", "group")
        .getMany()
    
        return dataGroupOnLesonInfo;
    }

    async getSubjectsStudyPlanByLessonid(lessonInfoId: number) {
        const lessonInfo: LessonInfo = await 
        this.lessonInfoRepository.createQueryBuilder("lesson_info")
        .leftJoinAndMapOne("lesson_info.studyPlan", "lesson_info.studyPlan", "study_plan")
        .leftJoinAndMapMany("study_plan.subjects", "study_plan.subjects", "subject")
        .leftJoinAndMapMany("subject.teacher", "subject.teacher", "teacher")
        .where("lesson_info.id = :idLessonInfo", { idLessonInfo: lessonInfoId })
        .getOne();

        const { subjects }: StudyPlan = lessonInfo.studyPlan;

        return subjects;
    }
    
}