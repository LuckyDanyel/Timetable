import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { TeacherService }  from './teacher.service';
import excelConverter from "../../converters/excelConverter";


@Controller('api/teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          const groupTeachers = await excelConverter(file);
          await this.teacherService.createTeachers(groupTeachers);
          return 'Save';
        } catch (error) {
          return error;
        }
    }
}