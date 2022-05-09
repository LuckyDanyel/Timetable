import { Injectable } from "@nestjs/common";
import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudyPlan } from '../studyPlan.entity';
import { Subject } from "../../subject/subject.entity";
import { CreateStudyPlanDto } from "../dto/studyPlan.dto";
import { Direction } from "src/api/direction/direction.entity";

@Injectable()
export class StudyPlanService {

    constructor(
        @InjectRepository(StudyPlan) private studyPlanRepository: Repository<Subject>,
        @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
        @InjectRepository(Direction) private directionRepository: Repository<Direction>
    ){}
    
    async createStudyPlan(dataStudyPlan: CreateStudyPlanDto): Promise<void> {
        const { dataDirections, dataSubjects, data_start, data_end } = dataStudyPlan;
        const massiveSubjects: Subject[] = [];
        const studyPlan = new StudyPlan();
        const direction = new Direction();

        direction.id = dataDirections.id;
        direction.nameDirection = dataDirections.nameDirection;
        direction.codeDirection = dataDirections.codeDirection;

        for(let subjectInfo of dataSubjects) {
            const subject = new Subject();
            subject.id = subjectInfo.id;
            subject.nameSubject = subjectInfo.nameSubject;
            massiveSubjects.push(subject);
        }

        studyPlan.start_semester = data_start;
        studyPlan.end_semester = data_end;
        studyPlan.direction = direction;
        studyPlan.subjects = [...massiveSubjects];

        await this.isDirectionHasPlan(direction);
        await this.studyPlanRepository.save(studyPlan);
    }

    async isDirectionHasPlan(direction: Direction): Promise<StudyPlan> {
        const directionInplan = await getManager().getRepository(StudyPlan)
        .createQueryBuilder("study_plan")
        .leftJoinAndSelect('study_plan.direction', "direction")
        .where("study_plan.direction.id = :directionId", { directionId: direction.id })
        .getOne();
        console.log(directionInplan);
        if(directionInplan) throw `this direction ${JSON.stringify(direction)} has study plan`
        return directionInplan;
    }
}