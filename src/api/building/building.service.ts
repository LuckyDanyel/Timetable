import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Building } from './building.entity';

@Injectable()
export class BuildingService {

    constructor(
        @InjectRepository(Building) private BuildingRepository: Repository<Building>,
    ){}
    
    async createBuildings(groupBuildings: any): Promise<void> {
        const massiveBuildings: Building[] = [];
        for(let numberStroke in groupBuildings) {
            const strokeDataBuilding = groupBuildings[numberStroke];
            const numberBuilding = strokeDataBuilding[0];
            const address = strokeDataBuilding[1];
            const building = new Building();
            building.numberCorpuse = numberBuilding;
            building.adress = address;
            await this.isBuildingInTable(numberBuilding);
            massiveBuildings.push(building);
        }
        const result = await this.BuildingRepository
        .createQueryBuilder()
        .insert()
        .values(massiveBuildings)
        .execute()
    }

    async isBuildingInTable(numberCorpuse: number): Promise<Building> {
        const building = await this.BuildingRepository.findOne({ numberCorpuse });

        if(building) throw `This building in table ${JSON.stringify(building)}`;

        return building;
    }

    async getBuildings(): Promise<Building[]> {
        const result = await this.BuildingRepository.find();
        return result;
        
    }
    
}