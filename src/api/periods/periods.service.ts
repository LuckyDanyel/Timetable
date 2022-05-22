import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Periods } from './periods.entity';
import { dataPeriods } from "./dataPeriods/periods.data";

@Injectable()
export class PeriodsService {

    constructor(
        @InjectRepository(Periods) private periodsRepository: Repository<Periods>,
    ){}
    
    async createPeridos(): Promise<void> {
        for(let periodData of dataPeriods) {
            const period = new Periods();
            period.name = periodData.name;
            period.start_time = periodData.start_time;
            period.end_time = periodData.end_time;
            const isPeriodInTable = await this.periodsRepository.findOne(period);
            if(!isPeriodInTable) {
                await this.periodsRepository.save(period);
            }
        }
    }
    
}