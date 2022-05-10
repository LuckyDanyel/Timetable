import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    } from "typeorm";
@Entity()
export class Audience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameAudince: string;

    @Column()
    nameStructure: string;
}