import { 
    Body,
  Controller, 
  Get, 
  Post,
} from "@nestjs/common";
import { LessonInfoCreateService }  from './services/lessonInfo.create.service';
import { LessonInfoGetService } from "./services/lessonInfo.get.service";

@Controller('api/lessonInfo')
export class LessonInfoController {
    constructor(
        private readonly lessonInfoCreateService: LessonInfoCreateService,
        private readonly lessonInfoGetService: LessonInfoGetService
        ){}

    @Post()
    async createAudience(@Body() dataLessonInfo: any) {
        try {
            await this.lessonInfoCreateService.createLessonInfo(dataLessonInfo);
            return "save"
        } catch (error) {
            return error;
        }
    }

    @Get('create')
    async getLessonInfoForCreate() {
        try {
            const result = await this.lessonInfoGetService.getLessonInfoForCreate();
            return result;
        } catch (error) {
            return error;
        }
    }

    @Get('get')
    async getLessonInfo() {
        try {
            const result = await this.lessonInfoGetService.getLessonInfo();
            return result;
        } catch (error) {
            
        }
    }

}