import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StudyPlanService }  from './studyPlan.service';


@Controller('api/studyPlan')
export class StudyPlanController {
    constructor(private readonly studyPlanService: StudyPlanService){}

    @Post('created')
    async createStudyPlan(@UploadedFile() file: any): Promise<string> {
        try {
          return 'Save';
        } catch (error) {
          return error;
        }
    }
}