import { 
    Body,
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post,
} from "@nestjs/common";
import { LessonCreateService } from "./services/lesson.create.service";
import { LessonGetService } from "./services/lesson.get.service";
import { lessonConverterSemestr } from "./converters/lessonSemestr.converter";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import { LessonDeleteService } from './services/lesson.delete.service';
import { PeriodsService } from "../periods/periods.service";
import { LessonDto } from "./dto/lesson.dto";
import { Lesson } from "./lesson.entity";


@Controller('api/lesson')
export class LessonController {
    constructor(
        private readonly lessonCreateService: LessonCreateService,
        private readonly lessonGetService: LessonGetService,
        private readonly periodsService: PeriodsService,
        private readonly lessonDeleteService: LessonDeleteService,
        private readonly typeLessonService: TypeLessonService
        ){}

    @Post('create')
    async createLessons(@Body() dataLesons: LessonDto[]): Promise<string> {
        try {
            await this.lessonCreateService.createLessons(dataLesons);
            return 'save'
        } catch (error) {
            return error
        }
    }

    @Get('/id/:id')
    async getLessons(@Param('id') id: string): Promise<string> {
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
    @Get('params/:indexDay/:parity/:periodId/:lessonInfoId')
    async getLessonsByParams(@Param() params: any): Promise<Lesson[]> {
        try {
            const result = await this.lessonGetService.getLessonsByIndexDayAndPeriod(params);
            return result;
        } catch (error) {
            return error;
        }
    }
    @Post('delete')
    async deleteLesson(@Body() dataIdLessons: number[]): Promise<string> {
        try {
            const result = this.lessonDeleteService.deleteLessons(dataIdLessons);
            return result;
        } catch (error) {
            return error
        }
    }
}