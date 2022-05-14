import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    } from "typeorm";
import { Institute } from "../institutes/institutes.entity";
import { Group } from "../group/group.entity";
import { StudyPlan } from "../studyPlan/studyPlan.entity";

@Entity()
export class Direction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameDirection: string;

    @Column()
    codeDirection: string;

    @OneToMany(() => StudyPlan, (studyPlan) => studyPlan.direction)
    studyPlans: StudyPlan[];

    @ManyToOne(() => Institute, (institute) => institute.directions)
    institute: Institute;

    @OneToMany(() => Group, (group) => group.direction)
    groups: Group[];
}