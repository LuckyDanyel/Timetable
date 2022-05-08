import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from './student.enity';
import { Group } from "../group/group.enity";

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Group) private GroupRepository: Repository<Group>
    ){}
    
    async createStudents(groupStudents: any): Promise<void> {
        for(let numberStroke in groupStudents) {
            const nameGroup = groupStudents[numberStroke][4];
            const group = await this.GroupRepository.findOne({ nameGroup });
            if(!group) throw `This group ${nameGroup} is not found`;
            const student = new Student();
            student.nameStudent = groupStudents[numberStroke][0];
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