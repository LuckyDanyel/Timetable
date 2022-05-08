import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from './subject.entity';
import { Teacher } from "../teacher/teacher.entity";
import { TeacherDto } from "../teacher/dto/teacher.dto";

@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>
    ){}
    
    async createSubjects(groupRows: any): Promise<void> {
        const groupTeachersOnSubject = await this.groupTeachersOnSubject(groupRows);
        for(let group in groupTeachersOnSubject) {
            const subject = this.setFieldSubject(group);
            const saveSubject = await this.isSubjectInTable(subject);
            const subjectWithTeacher = this.setFieldSubjectTeacher(groupTeachersOnSubject[group], group);
            if(saveSubject) {
                saveSubject.teacher = [...subjectWithTeacher.teacher];
                await this.subjectRepository.save(saveSubject);
            } else {
                await this.subjectRepository.save(subjectWithTeacher);
            }
        }
    }

    async groupTeachersOnSubject(groupRows: any) {
        const groupTeachersOnSubject = {};
        for(let numberStroke in groupRows) {
            const nameSubject = groupRows[numberStroke][4];
            const collectDataTeacher = this.collectDataTeacher(groupRows[numberStroke]);
            const teacher = await this.getTeacher(collectDataTeacher);

            if(!groupTeachersOnSubject[nameSubject]) {
                groupTeachersOnSubject[nameSubject] = [];
            }
            groupTeachersOnSubject[nameSubject].push(teacher);
        }
    
        return groupTeachersOnSubject;
    }

    collectDataTeacher(data: any): TeacherDto {
        const name = data[0];
        const surname = data[1];
        const patronymic = data[2];
        const numberСertificateTeacher = data[3];

        return new TeacherDto(
            name,
            surname,
            patronymic,
            numberСertificateTeacher
        )
    }

    async getTeacher(dataTeacher: TeacherDto): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne(dataTeacher)
        if(!teacher) throw `This teacher ${JSON.stringify(dataTeacher)} is not found`

        return teacher;
         
    }

    setFieldSubjectTeacher(massiveTeachers: any, nameSubject: string): Subject {
        const subject = new Subject();
        subject.nameSubject = nameSubject;
        subject.teacher = [...massiveTeachers];
        return subject;
    }

    setFieldSubject(nameSubject: string) {
        const subject = new Subject();
        subject.nameSubject = nameSubject;
        return subject;
    }

    async isSubjectInTable(subject: Subject) {
        const isSubjectInTable = await this.subjectRepository.findOne({
            nameSubject: subject.nameSubject,
        });
        return isSubjectInTable;
    }
}