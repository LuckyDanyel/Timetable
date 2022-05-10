import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from '../lesson.entity';

@Injectable()
export class LessonCreateService {

    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ){}
    
    async createLessons(dataLessons: any): Promise<void> {
        
    }
    
}