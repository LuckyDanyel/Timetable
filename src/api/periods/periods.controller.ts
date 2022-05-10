import { 
  Controller, 
  Post, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PeriodsService }  from './periods.service';


@Controller('api/audience')
export class PeriodsController {
    constructor(private readonly periodsService: PeriodsService){}

}