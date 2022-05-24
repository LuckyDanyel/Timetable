import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { Lesson } from "../lesson/lesson.entity";

@Entity()
export class DayWeek {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    indexDay: number;

    @OneToMany(() => Lesson, (lesson) => lesson.audience)
    lessons: Lesson[]

}