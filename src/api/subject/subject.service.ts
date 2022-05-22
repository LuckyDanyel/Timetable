import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from './subject.entity';
import { Teacher } from "../teacher/teacher.entity";
import { Institute } from "../institutes/institutes.entity";

@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
        @InjectRepository(Institute) private instituteRepository: Repository<Institute>,
    ){}
    
    async createSubjects(groupRows: any): Promise<void> {
        for(let subjectStroke in groupRows) {
            const dataTeacher = groupRows[subjectStroke][1];
            const dataInstitute = groupRows[subjectStroke][2];
            const massiveTeacher = await this.getMassiveTeachers(dataTeacher);
            const massiveInstitute = await this.getMassiveInstitute(dataInstitute);
            
            const name = groupRows[subjectStroke][0];
            const subject = new Subject();
            subject.name = name;
            subject.teacher = [...massiveTeacher];
            subject.institutes = [...massiveInstitute];
            await this.subjectRepository.save(subject);
        }
    }

    async getMassiveTeachers(dataTeacher: string): Promise<Teacher[]> {
        const result: Teacher[] = [];
        const masiveIdTeachers = dataTeacher.split(',');
        for(let teacherCertificateId of masiveIdTeachers) {
            const savedTeacher = await this.getTeacher(teacherCertificateId);
            result.push(savedTeacher);
        }

        return result;
    }

    async getTeacher(dataTeacher: string): Promise<Teacher> {
        const teacherCertificateId = Number(dataTeacher);
        const teacher = await this.teacherRepository.findOne({ numberСertificateTeacher: teacherCertificateId })
        if(!teacher) throw `This teacher ${JSON.stringify(dataTeacher)} is not found`

        return teacher;
         
    }

    async getMassiveInstitute(dataInstitute: string): Promise<Institute[]> {
        const result: Institute[] = [];
        const masiveNameInstitues = dataInstitute.split(',');
        for(let name of masiveNameInstitues) {
            const savedInstitue = await this.getInstitute(name);
            result.push(savedInstitue);
        }

        return result;
    }

    async getInstitute(name: string): Promise<Institute> {
        const institute = await this.instituteRepository.findOne({ name: name });
        if(!institute) throw `This institute ${name} is not found`;

        return institute;
    }

}