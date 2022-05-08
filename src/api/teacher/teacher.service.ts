import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from './teacher.entity';
import { Institute } from "../institutes/institutes.entity";

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
        @InjectRepository(Institute) private instituteRepository: Repository<Institute>
    ){}
    
    async createTeachers(groupTeachers: any): Promise<void> {
        for(let numberStroke in groupTeachers) {
            const nameInstitute = groupTeachers[numberStroke][5];
            const institute = await this.isInstituteInTable(nameInstitute);
            const teacher = this.setFieldTeacher(groupTeachers[numberStroke], institute);
            await this.saveTeacher(teacher);
        }
    }

    async isInstituteInTable(nameInstitute: string): Promise<Institute> {
        const institute = await this.instituteRepository.findOne({ nameInstitute });

        if(!institute) throw `this institute ${nameInstitute} not found`;

        return institute;
    }

    setFieldTeacher(dataTeacher: any, institute: Institute): Teacher {
        const teacher = new Teacher();
        teacher.name = dataTeacher[0];
        teacher.surname = dataTeacher[1];
        teacher.patronymic = dataTeacher[2];
        teacher.position = dataTeacher[3];
        teacher.numberСertificateTeacher = dataTeacher[4];
        teacher.institute = institute;

        return teacher;
    }

    async saveTeacher(teacher: Teacher) {
        const isTeacherInTable = await this.teacherRepository.findOne(teacher);
        if(!isTeacherInTable) {
            await this.teacherRepository.save(teacher);
        } 
    }


    
}