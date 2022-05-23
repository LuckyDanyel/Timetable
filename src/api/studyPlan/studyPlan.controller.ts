import { 
  Body,
  Controller, 
  Get, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StudyPlanService }  from './services/studyPlan.create.service';
import { GetStudyPlanService }  from './services/studyPlan.get.service';
import { LessonInfoCreateService } from "../lessonInfo/services/lessonInfo.create.service";
import { CreateStudyPlanDto } from "./dto/studyPlan.dto";

@Controller('api/studyPlan')
export class StudyPlanController {
    constructor(
      private readonly studyPlanService: StudyPlanService,
      private readonly getStudyPlanService: GetStudyPlanService,
      private readonly lessonInfoCreateService: LessonInfoCreateService,
      ){}

    @Post()
    async createStudyPlan(@Body() dataStudyPlan: CreateStudyPlanDto): Promise<string> {
        try {
          const { dataDirections, course } = dataStudyPlan;
          const groups = await this.lessonInfoCreateService.getGroupsOnDirection({
            direction: dataDirections,
            course,
          });
          const result = await this.studyPlanService.createStudyPlan(dataStudyPlan);
          const resultSecond = await this.lessonInfoCreateService.createLessonInfo({
            direction: dataDirections,
            course,
            groups,
          });
          return 'Save';
        } catch (error) {
          return error;
        }
    }

    @Get()
    async getDataStudyPlan(): Promise<any> {
      try {
        const dataStudyPlan = await this.getStudyPlanService.getDataStudyPlan();
        return dataStudyPlan; 
      } catch (error) {
        return error;
      }
    }
}