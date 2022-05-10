import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    } from "typeorm";
    
@Entity()
export class Periods {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numberPeriod: number;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

}