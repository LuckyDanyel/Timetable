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
import { GroupService }  from './group.service';
import excelConverter from "../../converters/excelConverter";


@Controller('api/group')
export class GroupController {
    constructor(private readonly groupService: GroupService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async uploadfile(@UploadedFile() file: any): Promise<string> {
        try {
          const groupedGroups = await excelConverter(file);
          await this.groupService.createGroups(groupedGroups);
          return 'Save';
        } catch (error) {
          return error;
        }
    }
}