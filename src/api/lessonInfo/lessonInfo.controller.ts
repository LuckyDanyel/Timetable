import { 
    Body,
  Controller, 
  Post,
  UploadedFile,
  UseInterceptors, 
} from "@nestjs/common";
import { LessonInfoService }  from './lessonInfo.service';

@Controller('api/lessonInfo')
export class LessonInfoController {
    constructor(private readonly lessonInfoService: LessonInfoService){}

    @Post('create')
    async createAudience(@Body() dataLessonInfo: any) {
        try {
            await this.lessonInfoService.createLessonInfo(dataLessonInfo);
        } catch (error) {
            
        }
    }

}