import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from '../lesson.entity';

@Injectable()
export class LessonDeleteService {

    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ){}

    async deleteLessons(massiveIdLesson: number[]): Promise<string> {
        try {
            for(let id of massiveIdLesson) {
                await this.lessonRepository.delete(id);
            }
            return 'delete';
        } catch (error) {
            return error;
        }
    }
     
}