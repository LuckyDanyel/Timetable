import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    } from "typeorm";
import { Direction } from "../direction/direction.entity";
import { Student } from "../student/student.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameGroup: string;

    @Column({default: true})
    countStudents: number = 0;

    @ManyToOne(() => Direction, (direction) => direction.groups)
    direction: Direction;

    @OneToMany(() => Student, (student) => student.group)
    students: Student[];

    @OneToMany(() => LessonInfo, (lessonInfo) => lessonInfo.group)
    lessonInfoes: LessonInfo[];
}