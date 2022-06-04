import { 
  Controller, 
  Get, 
  Param, 
  UploadedFile,
} from "@nestjs/common";
import { LessonEditService }  from './lessonEdit.service';
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { LessonInfoGetService } from "../lessonInfo/services/lessonInfo.get.service";
import { AudienceService } from "../audience/audience.service";
import { BuildingService } from "../building/building.service";
import { LessonGetService } from "../lesson/services/lesson.get.service";

@Controller('api/lessonEdit')
export class LessonEditController {
    constructor(
      	private readonly lessonEditService: LessonEditService,
      	private readonly typeLessonService: TypeLessonService,
      	private readonly lessonInfoGetService: LessonInfoGetService,
      	private readonly audienceService: AudienceService,
	  	private readonly buildingService: BuildingService,
	  	private readonly lessonGetService: LessonGetService,
      ){}

    @Get(':idLessonInfo')
    async getDataForEditLesson(@Param() params: any) {
        try {
			const { idLessonInfo, date } = params;
        	const result = await Promise.all([
				this.typeLessonService.getTypeLessons(),
				this.lessonInfoGetService.getSubjectsStudyPlanByLessonid(idLessonInfo),
				this.buildingService.getBuildings(),
				this.audienceService.getAudiences(),
        ])
			const dataTypeLesson = result[0];
			const dataSubjects = result[1];
			const dataBuildings = result[2];
			const dataAudince = result[3];

            return {
				dataCreateLesson: {
					dataTypeLesson,
					dataBuildings,
					dataSubjects,
					dataAudince,
				}
            }
        } catch (error) {
            return error;
        }
    }

}