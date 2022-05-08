import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudyPlan } from './studyPlan.entity';
import { Subject } from "../subject/subject.entity";

@Injectable()
export class StudyPlanService {

    constructor(
        @InjectRepository(StudyPlan) private studyPlanRepository: Repository<Subject>,
        @InjectRepository(Subject) private subjectRepository: Repository<Subject>
    ){}
    
    async createStudyPlan(groupRows: any): Promise<void> {
    }
}