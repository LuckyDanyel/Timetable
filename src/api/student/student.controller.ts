import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StudentService }  from './student.service';
import excelConverter from "../../converters/excelConverter";


@Controller('api/student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          const groupStudents = await excelConverter(file);
          await this.studentService.createStudents(groupStudents);
          return 'Save';
        } catch (error) {
          return error;
        }
    }
}