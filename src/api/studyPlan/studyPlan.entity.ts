import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    } from "typeorm";
import { Subject } from "../subject/subject.entity";
import { Direction } from "../direction/direction.entity";

@Entity()
export class StudyPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_semester: Date;
        
    @Column()
    end_semester: Date;

    @ManyToMany(() => Subject)
    @JoinTable()
    subjects: Subject[]

    @OneToOne(() => Direction)
    @JoinColumn()
    direction: Direction;
}