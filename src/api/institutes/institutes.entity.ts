import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
 } from "typeorm";

 import { Direction } from "../direction/direction.entity";
 import { Teacher } from "../teacher/teacher.entity";

@Entity()
export class Institute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    typeInstitute: string;

    @OneToMany(()=> Direction, (directions)=> directions.institute)
    directions: Direction[];

    @OneToMany(()=> Teacher, (teacher)=> teacher.institute)
    teacher: Teacher[];
}