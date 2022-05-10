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


@Controller('api/lesson')
export class LessonController {
    constructor(
        private readonly lessonCreateService: LessonCreateService,
        private readonly lessonGetService: LessonGetService
        ){}

    @Post('create')
    async createLessons(@Body() dataLesons: any): Promise<string> {
        try {
            await this.lessonCreateService.createLessons(dataLesons);
            return 'save'
        } catch (error) {
            return error
        }
    }

    @Get('edit/:id')
    async getLessonsEdit(@Param('id') id: string): Promise<string> {
        try {
            const massiveLessons = await this.lessonGetService.getLessons(id);
            const result = lessonConverterSemestr(massiveLessons);
        } catch (error) {
            
        }
        return;
    }
}