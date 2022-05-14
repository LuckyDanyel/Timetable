import { 
  Controller, 
  Get, 
  Param, 
  UploadedFile,
} from "@nestjs/common";
import { LessonEditService }  from './lessonEdit.service';
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { LessonInfoGetService } from "../lessonInfo/services/lessonInfo.get.service";

@Controller('api/lessonEdit')
export class LessonEditController {
    constructor(
      private readonly lessonEditServiceService: LessonEditService,
      private readonly typeLessonService: TypeLessonService,
      private readonly lessonInfoGetService: LessonInfoGetService,
      ){}

    @Get(':id')
    async getDataForEditLesson(@Param('id') idLessonInfo: number) {
        try {
            const dataTypeLesson = await this.typeLessonService.getTypeLessons();
            const dataSubjects = await this.lessonInfoGetService.getSubjectsStudyPlanByLessonid(idLessonInfo);
            return {
              dataTypeLesson,
              dataSubjects
            }
        } catch (error) {
            return error;
        }
    }

}