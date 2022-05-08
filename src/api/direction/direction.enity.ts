import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    } from "typeorm";
import { Institute } from "../institutes/institutes.enity";
import { Group } from "../group/group.enity";

@Entity()
export class Direction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameDirection: string;

    @Column()
    codeDirection: string;

    @ManyToOne(() => Institute, (institute) => institute.directions)
    institute: Institute;

    @OneToMany(() => Group, (group) => group.direction)
    groups: Group[];
}