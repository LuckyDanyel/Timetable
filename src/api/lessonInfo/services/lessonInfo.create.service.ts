import { HttpStatus, Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonInfo } from '../lessonInfo.entity';
import { StudyPlan } from "src/api/studyPlan/studyPlan.entity";
import { Direction } from "src/api/direction/direction.entity";
import { Group } from "src/api/group/group.entity";

@Injectable()
export class LessonInfoCreateService {

    constructor(
        @InjectRepository(LessonInfo) private lessonInfoRepository: Repository<LessonInfo>,
    ){}
    
    async createLessonInfo(dataLessons: any): Promise<void> {
        const { dataGroup } = dataLessons;

        const studyPlan = await this.getStudyPlanOnDirectionAndCourse(dataLessons.dataGroup);
        await this.IsGroupHasLessonInfo(dataGroup);

        const lessonInfo = new LessonInfo();
        lessonInfo.group = dataGroup;
        lessonInfo.studyPlan = studyPlan;
        
        await this.lessonInfoRepository.save(lessonInfo);
    }

    async IsGroupHasLessonInfo(group: Group) {
        const groupInLessonInfo = await getManager().getRepository(LessonInfo)
        .createQueryBuilder("lesson_info")
        .leftJoinAndSelect('lesson_info.group', "direction")
        .where("lesson_info.group.id = :groupId", { groupId: group.id })
        .getOne();
        if(groupInLessonInfo) throw `This group ${JSON.stringify(group)} has infoLessons`
        return groupInLessonInfo;
    }

    async getStudyPlanOnDirectionAndCourse(dataGroup: Group): Promise<StudyPlan> {
        const { direction, course } = dataGroup;
        const directionCourseInPlan = await getManager().getRepository(StudyPlan)
        .createQueryBuilder("study_plan")
        .leftJoinAndSelect('study_plan.direction', "direction")
        .where("study_plan.direction.id = :directionId", { directionId: direction.id })
        .andWhere("study_plan.course = :courseNumber", { courseNumber: course })
        .getOne();
        console.log(!directionCourseInPlan);
        if(!directionCourseInPlan) throw `This direction ${JSON.stringify(direction)} and this course - ${course} doesn't in studyPlan`
        return directionCourseInPlan;
    }
    
}