import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    } from "typeorm";
import { Group } from "../group/group.entity";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameStudent: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column()
    numberCardStudent: number;

    @ManyToOne(() => Group, (group) => group.students)
    group: Group;
}