import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Lesson } from "../lesson/lesson.entity";
import { Group } from "../group/group.entity";
import { StudyPlan } from "../studyPlan/studyPlan.entity";

@Entity()
export class LessonInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Group, (group) => group.lessonInfoes)
    group: Group

    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.lessonInfoes)
    studyPlan: StudyPlan

    @OneToMany(() => Lesson, (lesson) => lesson.lessonInfo)
    lessons: Lesson[]
    
}