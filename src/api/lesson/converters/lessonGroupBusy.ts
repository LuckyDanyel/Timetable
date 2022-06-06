import { Lesson } from "../lesson.entity";
export default function(dataLesson: Lesson[]): any {
    const result = {
        groupAudience: {},
        groupTeachers: {},
        groupStudentsGroup: {},
    };

    for(let lesson of dataLesson) {
        const { audience, teacher, lessonInfo } = lesson;
        const { group } = lessonInfo;
        const { direction, course } = group;
        if(!result.groupAudience[audience.id]) {
            result.groupAudience[audience.id] = [];
        }
        if(!result.groupTeachers[teacher.id]) {
            result.groupTeachers[teacher.id] = [];
        }
        result.groupAudience[audience.id].push(lesson);
        result.groupTeachers[teacher.id].push(lesson);

        const hashDirectionCourse = String(direction.id).concat(String(course));
        result.groupStudentsGroup[hashDirectionCourse] = group;
        result.groupStudentsGroup[hashDirectionCourse].lection = lesson.typeLesson.name;
    }

    return result;
    
}