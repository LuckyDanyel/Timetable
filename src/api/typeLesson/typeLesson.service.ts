import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeLesson } from './typeLesson.entity';
import { dataTypeLesson } from "./dataTypeLesson/TypeLesson.data";

@Injectable()
export class TypeLessonService {

    constructor(
        @InjectRepository(TypeLesson) private typeLessonRepository: Repository<TypeLesson>,
    ){}
    
    async createTypeLesson(): Promise<void> {
        for(let typeLesson of dataTypeLesson) {
            await this.typeLessonRepository.save(typeLesson);
        }
    }

    async getTypeLessons(): Promise<TypeLesson[]> {
        const dataTypeLesson = await this.typeLessonRepository.find();
        return dataTypeLesson;
    }

    async getTypeLesson(id: number): Promise<TypeLesson> {
        const typeLesson = await this.typeLessonRepository.findOne({ id })
        return typeLesson;
    }
    
}