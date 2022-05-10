import { 
  Controller, 
  Post,
  UploadedFile,
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AudienceService }  from './audience.service';
import excelConverter from '../../converters/excelConverter';


@Controller('api/audience')
export class AudienceController {
    constructor(private readonly audienceService: AudienceService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async createAudience(@UploadedFile() excelFile) {
        try {
            const dataAudince = await excelConverter(excelFile);
            await this.audienceService.createAudience(dataAudince);
        } catch (error) {
            
        }
    }

}