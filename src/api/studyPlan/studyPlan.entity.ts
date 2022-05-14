import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
    } from "typeorm";
import { Subject } from "../subject/subject.entity";
import { Direction } from "../direction/direction.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";

@Entity()
export class StudyPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_semester: Date;
        
    @Column()
    end_semester: Date;

    @Column()
    course: number;

    @ManyToMany(() => Subject)
    @JoinTable()
    subjects: Subject[]

    @ManyToOne(() => Direction, (dircetion) => dircetion.studyPlans)
    direction: Direction;

    @OneToMany(() => LessonInfo, (lessonInfo) => lessonInfo.studyPlan)
    lessonInfoes: LessonInfo[]
}