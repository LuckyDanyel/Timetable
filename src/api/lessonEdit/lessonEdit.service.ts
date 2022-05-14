import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeLesson } from "../typeLesson/typeLesson.entity";

@Injectable()
export class LessonEditService {

    constructor(
        @InjectRepository(TypeLesson) private typeLessonRepository: Repository<TypeLesson>,
    ){}
    
    async getDataForEditLesson(): Promise<void> {
        
    }
    
}