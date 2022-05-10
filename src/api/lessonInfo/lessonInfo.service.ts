import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonInfo } from './lessonInfo.entity';

@Injectable()
export class LessonInfoService {

    constructor(
        @InjectRepository(LessonInfo) private lessonInfoRepository: Repository<LessonInfo>,
    ){}
    
    async createLessonInfo(dataLessons: any): Promise<void> {
        
    }
    
}