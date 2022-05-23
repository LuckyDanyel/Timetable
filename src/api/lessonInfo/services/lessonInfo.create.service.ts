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
        const { groups } = dataLessons;
        const studyPlan = await this.getStudyPlanOnDirectionAndCourse(dataLessons);

        for(let group of groups) {
            const lessonInfo = new LessonInfo();
            lessonInfo.group = group;
            lessonInfo.studyPlan = studyPlan;
            await this.lessonInfoRepository.save(lessonInfo);
        }
    }

    async getGroupsOnDirection(dataLessons: any) {
        const { direction, course } = dataLessons;
        console.log(direction);
        const groupsOnDirection = await getManager().getRepository(Group)
        .createQueryBuilder("group")
        .leftJoinAndSelect('group.direction', "direction")
        .where("group.direction.id = :directionId", { directionId: direction.id })
        .andWhere("group.course = :courseNumber", { courseNumber: course })
        .getMany();
        if(groupsOnDirection.length === 0) throw `Not found groups on this direction - ${JSON.stringify(direction.name)} and this course - ${JSON.stringify(course)}`
        return groupsOnDirection;
    }

    async getStudyPlanOnDirectionAndCourse(dataLessons: Group): Promise<StudyPlan> {
        const { direction, course } = dataLessons;
        const directionCourseInPlan = await getManager().getRepository(StudyPlan)
        .createQueryBuilder("study_plan")
        .leftJoinAndSelect('study_plan.direction', "direction")
        .where("study_plan.direction.id = :directionId", { directionId: direction.id })
        .andWhere("study_plan.course = :courseNumber", { courseNumber: course })
        .getOne();
        if(!directionCourseInPlan) throw `This direction ${JSON.stringify(direction)} and this course - ${course} doesn't in studyPlan`
        return directionCourseInPlan;
    }
    
}