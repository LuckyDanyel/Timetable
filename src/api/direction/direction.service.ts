import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Direction } from './direction.entity';
import { Institute } from "../institutes/institutes.entity";

@Injectable()
export class DirectionService {

    constructor(
        @InjectRepository(Direction) private directionRepository: Repository<Direction>,
        @InjectRepository(Institute) private instituteRepository: Repository<Institute>
    ){}
    
    async createDirections(groupDirections: any): Promise<void> {
        for(let numberStroke in groupDirections) {
            const name = groupDirections[numberStroke][2];
            const institute = await this.instituteRepository.findOne({ name })
            if(!institute) throw `This institute is not found ${name}`; 
            const direction = new Direction();
            direction.name = groupDirections[numberStroke][0];
            direction.codeDirection = groupDirections[numberStroke][1];
            direction.institute = institute;
            await this.directionRepository.save(direction);
        }
    }
    
}