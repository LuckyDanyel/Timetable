import { 
    Column,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn,
} from "typeorm";
import { Subject } from "../subject/subject.entity";
import { Teacher } from "../teacher/teacher.entity";
import { Periods } from "../periods/periods.entity";
import { Audience } from "../audience/audience.entity";
import { LessonInfo } from "../lessonInfo/lessonInfo.entity";
import { TypeLesson } from "../typeLesson/typeLesson.entity";
import { DayWeek } from "../dayWeek/dayWeek.entity";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => Subject, (subject) => subject.lessons)
    subject: Subject;

    @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
    teacher: Teacher;

    @ManyToOne(() => Periods, (periods) => periods.lessons)
    periods: Periods;

    @ManyToOne(() => Audience, (audience) => audience.lessons)
    audience: Audience;

    @ManyToOne(() => LessonInfo, (lessonInfo) => lessonInfo.lessons)
    lessonInfo: LessonInfo

    @ManyToOne(() => TypeLesson, (typeLesson) => typeLesson.lessons)
    typeLesson: TypeLesson;

    @ManyToOne(() => DayWeek, (dayWeek) => dayWeek.lessons)
    dayWeek: DayWeek;

}