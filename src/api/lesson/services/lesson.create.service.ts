import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from '../lesson.entity';
import { LessonInfo } from "src/api/lessonInfo/lessonInfo.entity";
import { LessonDto } from "../dto/lesson.dto";

@Injectable()
export class LessonCreateService {

    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ){}
    
    async createLessons(dataLessons: LessonDto[]): Promise<void> {
        for(let dataLesson of dataLessons) {
            const { idLesson } = dataLesson;

            const lesson = this.addRelationsToLesson(dataLesson);
            if(idLesson) {
                lesson.id = idLesson;
                await this.updateLesson(lesson);
                return;
            }

            await this.addLesson(lesson);
        }
    }

    async updateLesson(lesson: Lesson): Promise<void> {
        await this.lessonRepository.update({ id: lesson.id }, lesson);
    }

    async addLesson(lesson: Lesson): Promise<void> {
        this.lessonRepository.save(lesson);
    }

    addRelationsToLesson(dataLesson: LessonDto): Lesson {
        const { 
            idLessonInfo,
            period,
            date, 
            dataTypeLesson,
            audience,
            subject,
            teacher,
            dayIndex,
            parity,
        } = dataLesson;

        if(idLessonInfo && dataTypeLesson && audience && subject && teacher && period) {
            const lessonInfo = new LessonInfo();
            lessonInfo.id = idLessonInfo;

            const lesson = new Lesson();
            lesson.lessonInfo = lessonInfo;
            lesson.typeLesson = dataTypeLesson;
            lesson.periods = period;
            lesson.date = date;
            lesson.audience = audience;
            lesson.subject = subject;
            lesson.teacher = teacher;
            lesson.dayIndex = dayIndex;
            lesson.parity = parity;

            return lesson;
        }

        throw `Неправильный формат данных, следует ввести следующий формат: ${JSON.stringify({
            idLessonInfo: "SomeData",
            period: "SomeData",
            date: "SomeData",
            dataTypeLesson: "SomeData", 
            audience: "Somedata",
            subject: "SomeData",
            teacher: "SomeData",
         })}`

    }
     
}