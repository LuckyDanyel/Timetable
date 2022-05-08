import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Institute } from './institutes.entity';

@Injectable()
export class InstituteService {

    constructor(
        @InjectRepository(Institute) 
        private InstituteRepository: Repository<Institute>
    ){}
    
    async createInstitutes(groupInstitute: any): Promise<void> {
        for(let numberStroke in groupInstitute) {
            const institute = new Institute();
            institute.nameInstitute = groupInstitute[numberStroke][0];
            institute.typeInstitute = groupInstitute[numberStroke][1];
            const isIstituteInTable = await this.InstituteRepository.findOne(institute);
            if(!isIstituteInTable) {
                await this.InstituteRepository.save(institute);
            }
        }
    }
    
}