import { Direction } from "src/api/direction/direction.entity";
import { Subject } from "src/api/subject/subject.entity";

export class CreateStudyPlanDto {
    dataDirections: Direction;
    data_start: Date;
    data_end: Date;
    dataSubjects: Subject[];
}