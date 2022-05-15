import { 
  Controller, 
  Get, 
  Param, 
  Post,
  UploadedFile,
  UseInterceptors, 
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BuildingService }  from './building.service';
import excelConverter from '../../converters/excelConverter';


@Controller('api/building')
export class BuildingController {
    constructor(private readonly buildingService: BuildingService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('excel'))
    async createAudience(@UploadedFile() excelFile) {
        try {
            const dataBuilding = await excelConverter(excelFile);
            await this.buildingService.createBuildings(dataBuilding);
            return 'save';
        } catch (error) {
            return error;
        }
    }

    @Get()
    async getBuildings(): Promise<any> {
        try {
            
            return;
        } catch (error) {
            
        }
    }
}