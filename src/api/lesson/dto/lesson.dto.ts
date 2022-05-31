import { Audience } from "src/api/audience/audience.entity";
import { TypeLesson } from "src/api/typeLesson/typeLesson.entity";
import { Subject } from "src/api/subject/subject.entity";
import { Teacher } from "src/api/teacher/teacher.entity";
import { Periods } from "src/api/periods/periods.entity";

export class LessonDto {
    idLessonInfo: number;
    idLesson: number | null;
    dayIndex: number;
    parity: number;
    date: Date;
    dayWeek: number;
    dataTypeLesson: TypeLesson;
    audience: Audience;
    period: Periods;
    subject: Subject;
    teacher: Teacher;

}