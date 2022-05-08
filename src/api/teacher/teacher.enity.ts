import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    } from "typeorm";
import { Institute } from "../institutes/institutes.enity";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column()
    position: string;

    @Column()
    numberСertificateTeacher: number;

    @ManyToOne(() => Institute, (institute) => institute.teacher,  { cascade: true })
    institute: Institute;

}