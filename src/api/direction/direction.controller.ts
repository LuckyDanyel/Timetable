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
import { FileInterceptor } from "@nestjs/platform-express";
import { DirectionService }  from './direction.service';
import excelConverter from "../../converters/excelConverter";


@Controller('api/direction')
export class DirectionController {
    constructor(private readonly directionService: DirectionService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          const groupDirections = await excelConverter(file);
          await this.directionService.createDirections(groupDirections);
          return 'Save';
        } catch (error) {
          console.log(error);
          return 'No save';
        }
    }
}