import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { Lesson } from "../lesson/lesson.entity";
import { Building } from "../building/building.entity";

@Entity()
export class Audience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameAudince: string;

    @OneToMany(() => Lesson, (lesson) => lesson.audience)
    lessons: Lesson[]

    @ManyToOne(() => Building, (building) => building.audiences)
    building: Building;

}