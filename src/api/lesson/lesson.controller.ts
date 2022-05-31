import { 
    Body,
    Controller, 
    Get, 
    Param, 
    Post,
} from "@nestjs/common";
import { LessonCreateService } from "./services/lesson.create.service";
import { LessonGetService } from "./services/lesson.get.service";
import { lessonConverterSemestr } from "./converters/lessonSemestr.converter";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { PeriodsService } from "../periods/periods.service";
import { LessonDto } from "./dto/lesson.dto";


@Controller('api/lesson')
export class LessonController {
    constructor(
        private readonly lessonCreateService: LessonCreateService,
        private readonly lessonGetService: LessonGetService,
        private readonly periodsService: PeriodsService,
        private readonly typeLessonService: TypeLessonService
        ){}

    @Post('create')
    async createLessons(@Body() dataLesons: LessonDto): Promise<string> {
        try {
            await this.lessonCreateService.createLesson(dataLesons);
            return 'save'
        } catch (error) {
            return error
        }
    }

    @Get(':id')
    async getLessonsEdit(@Param('id') id: string): Promise<string> {
        try {
            const periods = await this.periodsService.getPeridods();
            const dataLessons = await this.lessonGetService.getLessons(id);
            dataLessons.periods = periods;
            const result = lessonConverterSemestr(dataLessons);
            return result;
        } catch (error) {
            return error;
        }
    }
}