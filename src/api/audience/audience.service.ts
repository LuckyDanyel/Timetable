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
    }
    
}