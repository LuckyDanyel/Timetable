import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Audience } from './audience.entity';
import { Building } from "../building/building.entity";

@Injectable()
export class AudienceService {

    constructor(
        @InjectRepository(Audience) private audienceRepository: Repository<Audience>,
        @InjectRepository(Building) private buildingRepository: Repository<Building>
    ){}
    
    async createAudience(groupAudiences: any): Promise<void> {
        for(let numberStroke in groupAudiences) {
            const nameAuidence = groupAudiences[numberStroke][0];
            const numberBuilding = groupAudiences[numberStroke][1];
            const building = await this.getBuilding(numberBuilding);
            const audience = new Audience();
            audience.name = nameAuidence;
            audience.building = building;
            console.log(audience);
            const isAudienceInTable = await this.audienceRepository.findOne(audience);
            console.log(audience);
            if(isAudienceInTable) throw `this audience ${ JSON.stringify( audience.name ) } in table`

            await this.audienceRepository.save(audience);

        }
    }
    async getBuilding(numberBuilding: number): Promise<Building> {
        const building = await this.buildingRepository.findOne({ numberCorpuse: numberBuilding });

        if(!building) throw `This corpuse ${ numberBuilding } is not defined`;

        return building;
    }

    async getAudiences(): Promise<Audience[]> {
        const result = await this.audienceRepository.find({
            relations: ["building"],
        });
        return result;
    }
}