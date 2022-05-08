import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    } from "typeorm";
import { Subject } from "../subject/subject.entity";

@Entity()
export class StudyPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameSubject: string;

    @ManyToMany(() => Subject)
    @JoinTable()
    subjects: Subject[]
}