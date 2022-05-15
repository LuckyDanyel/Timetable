import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { Audience } from "../audience/audience.entity";

@Entity()
export class Building {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    numberCorpuse: number;

    @Column()
    adress: string;

    @OneToMany(() => Audience, (audience) => audience.building)
    audiences: Audience[];

}