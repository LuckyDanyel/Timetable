import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from './student.entity';
import { Group } from "../group/group.entity";

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Group) private GroupRepository: Repository<Group>
    ){}
    
    async createStudents(groupStudents: any): Promise<void> {
        for(let numberStroke in groupStudents) {
            const name = groupStudents[numberStroke][4];
            const group = await this.GroupRepository.findOne({ name });
            if(!group) throw `This group ${name} is not found`;
            const student = new Student();
            student.name = groupStudents[numberStroke][0];
            student.surname = groupStudents[numberStroke][1];
            student.patronymic = groupStudents[numberStroke][2];
            student.numberCardStudent = groupStudents[numberStroke][3];
            student.group = group;
            const isStudentInTable = await this.studentRepository.findOne(student);
            if(!isStudentInTable) {
                await this.studentRepository.save(student);
                group.countStudents = group.countStudents + 1;
                await this.GroupRepository.update(group.id, group)
            }
        }
    }
    
}