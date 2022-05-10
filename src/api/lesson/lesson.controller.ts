import { 
    Body,
    Controller, 
    Post,
} from "@nestjs/common";
import { LessonCreateService } from "./services/lesson.create.service";
import excelConverter from '../../converters/excelConverter';


@Controller('api/lesson')
export class LessonController {
    constructor(private readonly lessonCreateService: LessonCreateService){}

    @Post('create')
    async createLessons(@Body() dataLesons: any): Promise<string> {
        try {
            await this.lessonCreateService.createLessons(dataLesons);
            return 'save'
        } catch (error) {
            return error
        }
    }
}