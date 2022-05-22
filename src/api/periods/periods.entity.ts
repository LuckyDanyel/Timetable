import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { Lesson } from "../lesson/lesson.entity";
    
@Entity()
export class Periods {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: number;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @OneToMany(() => Lesson, (lesson) => lesson.periods)
    lessons: Lesson[]

}