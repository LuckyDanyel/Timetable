import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { Lesson } from "../lesson/lesson.entity";

@Entity()
export class TypeLesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Lesson, (lesson) => lesson.typeLesson)
    lessons: Lesson[];
}