import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    } from "typeorm";
import { Teacher } from "../teacher/teacher.entity";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameSubject: string;

    @ManyToMany(() => Teacher)
    @JoinTable()
    teacher: Teacher[]
}