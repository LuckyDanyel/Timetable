import { 
  Controller, 
  Post, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AudienceService }  from './audience.service';


@Controller('api/audience')
export class AudienceController {
    constructor(private readonly audienceService: AudienceService){}

}