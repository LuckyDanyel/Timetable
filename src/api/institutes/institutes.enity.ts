import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
 } from "typeorm";

 import { Direction } from "../direction/direction.enity";
 import { Teacher } from "../teacher/teacher.enity";

@Entity()
export class Institute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameInstitute: string;

    @Column()
    typeInstitute: string;

    @OneToMany(()=> Direction, (directions)=> directions.institute)
    directions: Direction[];

    @OneToMany(()=> Teacher, (teacher)=> teacher.institute)
    teacher: Teacher[];
}