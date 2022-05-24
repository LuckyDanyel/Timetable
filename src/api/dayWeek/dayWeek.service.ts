import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DayWeek } from './dayWeek.entity';
import { dataWeek } from './data/dayWeekData';

@Injectable()
export class DayWeekService {

    constructor(
        @InjectRepository(DayWeek) private dayWeekRepository: Repository<DayWeek>,
    ){}
    
    async createDayWeeks(): Promise<void> {
        for(let dayWeek of dataWeek) {
            const day = new DayWeek();
            day.indexDay = dayWeek.indexDay;
            day.name = dayWeek.name;
            await this.dayWeekRepository.save(day);
        }
    }
}