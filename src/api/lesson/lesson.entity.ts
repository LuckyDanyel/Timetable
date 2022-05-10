import { 
    Column,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../group/group.entity";
import { Subject } from "../subject/subject.entity";
import { Teacher } from "../teacher/teacher.entity";
import { Periods } from "../periods/periods.entity";
import { Audience } from "../audience/audience.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => Group, (group) => group.lessons)
    group: Group;

    @ManyToOne(() => Subject, (subject) => subject.lessons)
    subject: Subject;

    @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
    teacher: Teacher;

    @ManyToOne(() => Periods, (periods) => periods.lessons)
    periods: Periods;

    @ManyToOne(() => Audience, (audience) => audience.lessons)
    audience: Periods;

    @ManyToOne(() => LessonInfo, (lessonInfo) => lessonInfo.lessons)
    lessonInfo: LessonInfo

}