import { 
  Controller, 
} from "@nestjs/common";
import { DayWeekService }  from './dayWeek.service';

@Controller('api/audience')
export class DayWeekController {
    constructor(private readonly dayWeekService: DayWeekService){}

}