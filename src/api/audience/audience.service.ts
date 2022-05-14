import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Audience } from './audience.entity';

@Injectable()
export class AudienceService {

    constructor(
        @InjectRepository(Audience) private audienceRepository: Repository<Audience>,
    ){}
    
    async createAudience(groupAudiences: any): Promise<void> {
        for(let numberStroke in groupAudiences) {
            const nameAuidence = groupAudiences[numberStroke][0];
            const nameStructure = groupAudiences[numberStroke][1];
            const audience = new Audience();
            audience.nameAudince = nameAuidence;
            audience.nameStructure = nameStructure;
            const isAudienceInTable = await this.audienceRepository.findOne(audience);
            if(!isAudienceInTable) {
                await this.audienceRepository.save(audience);
            }

        }
    }

    async getFreeAudience(params: any): Promise<any> {
        
    }
    
}