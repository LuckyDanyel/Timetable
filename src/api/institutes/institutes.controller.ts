import { 
  Controller, 
  Get, 
  Post, 
  Res, 
  Body, 
  HttpStatus, 
  Delete, 
  Param, 
  UploadedFile, 
  UseInterceptors, 
  Header, 
  UploadedFiles
} from "@nestjs/common";
import { Express } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { Institute } from "./institutes.entity";
import { InstituteService }  from './istitutes.service';
import { PeriodsService } from "../periods/periods.service";
import { TypeLessonService } from "../typeLesson/typeLesson.service";
import excelConverter from "../../converters/excelConverter";


@Controller('api/institute')
export class InstitutesController {
    constructor(
      private readonly instituteService: InstituteService,
      private readonly periodsService: PeriodsService,
      private readonly typeLessonService: TypeLessonService,
      ){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          await this.periodsService.createPeridos();
          await this.typeLessonService.createTypeLesson();
          
          const groupIstitute = await excelConverter(file);
          await this.instituteService.createInstitutes(groupIstitute);
          return 'Save';
        } catch (error) {
          return error;
        }
    }
}