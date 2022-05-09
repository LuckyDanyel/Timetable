import { Injectable } from "@nestjs/common";
import { Repository, getManager } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudyPlan } from '../studyPlan.entity';
import { Institute } from "src/api/institutes/institutes.entity";
import { Direction } from "src/api/direction/direction.entity";
import { Subject } from "../../subject/subject.entity";

@Injectable()
export class GetStudyPlanService {

    constructor(
        @InjectRepository(StudyPlan) private studyPlanRepository: Repository<StudyPlan>,

    ){}
    
    async getDataStudyPlan(): Promise<any> {
        const manager = getManager();
        const dataInstitutes = await manager.find(Institute);

        const dataDirections = await manager.getRepository(Direction)
        .createQueryBuilder("direction")
        .leftJoinAndSelect("direction.institute", "metadata")
        .getMany()

        const dataSubjects = await manager.getRepository(Subject)
        .createQueryBuilder("subject")
        .leftJoinAndSelect('subject.institutes', "metadata")
        .getMany()
        
        return {
            dataInstitutes,
            dataDirections,
            dataSubjects,
        }
    }
}