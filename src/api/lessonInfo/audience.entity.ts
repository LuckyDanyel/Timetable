import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { Lesson } from "../lesson/lesson.entity";

@Entity()
export class Audience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameAudince: string;

    @Column()
    nameStructure: string;

    @OneToMany(() => Lesson, (lesson) => lesson.audience)
    lessons: Lesson[]

}