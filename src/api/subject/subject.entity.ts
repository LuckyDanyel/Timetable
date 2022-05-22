import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    } from "typeorm";
import { Teacher } from "../teacher/teacher.entity";
import { Institute } from "../institutes/institutes.entity";
import { Lesson } from "../lesson/lesson.entity";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Teacher)
    @JoinTable()
    teacher: Teacher[]

    @ManyToMany(() => Institute)
    @JoinTable()
    institutes: Institute[];

    @OneToMany(() => Lesson, (lesson) => lesson.subject)
    lessons: Lesson[];
}