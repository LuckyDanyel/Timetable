import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SubjectService }  from './subject.service';
import excelConverter from "../../converters/excelConverter";


@Controller('api/subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          const groupSubject = await excelConverter(file);
          await this.subjectService.createSubjects(groupSubject);
          return 'Save';
        } catch (error) {
          return error;
        }
    }
}