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
import excelConverter from "../../converters/excelConverter";


@Controller('api/institute')
export class InstitutesController {
    constructor(private readonly instituteService: InstituteService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          const groupIstitute = await excelConverter(file);
          await this.instituteService.createInstitutes(groupIstitute);
          return 'Save';
        } catch (error) {
          return 'No save';
        }
    }
}