const { DateTime } = require("luxon");
import { Lesson } from '../lesson.entity';

const massiveDays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

class WeekLessons {
    startWeek: Date;
    endWeek: Date;
    massiveLessonsOnWeek: {};
    parity: number;
}

export function lessonConverterSemestr(dataLessons: any): any {
    const { lessonInfo } = dataLessons;
    const { id: idLessonInfo, group, studyPlan } = lessonInfo;
    const { direction, id: idStudyPlan, course, start_semester, end_semester } =  studyPlan;
    const { id: idDirection, name, codeDirection, institute } = direction;
    const { massiveLessonGroup: massiveLessons } = dataLessons;
    const configureDate = createConfigureWeeks(start_semester, end_semester);
    const weekStructure = createStructureWeeksLessons(configureDate);
    const groupWeeks = groupWeeksOnMonth(weekStructure, configureDate);
    const monthWeeksLessons = addLessonsToWeeks(groupWeeks, massiveLessons, configureDate);
    return {
        idLessonInfo,
        group,
        institute,
        studyPlan: {
            idStudyPlan,
            course,
            start_semester,
            end_semester,
        },
        direction: {
            idDirection,
            name,
            codeDirection,
        },
        monthWeeksLessons,
    } 
    
}

function countMonthes(firstValue: Date, seondValue: Date): number {
    let firstDate = DateTime.fromJSDate(firstValue);
    let secondDate = DateTime.fromJSDate(seondValue);
    const countMonth = Math.ceil(secondDate.diff(firstDate, ['month']).toObject().months);
    return countMonth;
}

function createConfigureWeeks(start_semester: Date, end_semester: Date) {
    const countMonth = countMonthes(start_semester, end_semester);
    const mouthNumber = start_semester.getMonth();
    const year = start_semester.getFullYear();
    const day = start_semester.getDate();

    return {
        countMonth,
        mouthNumber,
        year,
        day,
    }
}

function createStructureWeeksLessons(dataConfigure: any): WeekLessons[] {
    const { year, mouthNumber, countMonth, day } = dataConfigure;
    const startDate = new Date(year, mouthNumber, day);
    const newDateStart = findDayMonday(startDate);

    let countDateWeek = 0;
    const result: WeekLessons[] = [];
    for(let i = 0; i < countMonth * 4; i++) {
        const week = new WeekLessons();
        const dateMonth = new Date(newDateStart);

        const dateWeekStart = new Date(dateMonth);
        dateWeekStart.setDate(dateMonth.getDate() + countDateWeek);
        week.startWeek = dateWeekStart;

        const dateWeekEnd = new Date(dateMonth);
        countDateWeek = countDateWeek + 7; 
        dateWeekEnd.setDate(dateMonth.getDate() + countDateWeek - 1);
        week.endWeek = dateWeekEnd;

        dateMonth.setMonth(startDate.getMonth() + i);
        result.push(week);
    }
    return result;
}

function groupWeeksOnMonth(dataWeeks: WeekLessons[], dateConfigure: any): any {
    const { year, mouthNumber, countMonth } = dateConfigure;
    const groupData = {};
    let count = 0;
    let parity = 0;
    for(let week of dataWeeks) {
        count++;
        parity = count % 2;
        week.massiveLessonsOnWeek = {};
        week.parity = parity;
        for(let i = 1; i <= 6; i++) {
            week.massiveLessonsOnWeek[i] = [];
        }
        const monthIndexEnd = week.endWeek.getMonth();
        if(!groupData[monthIndexEnd]) {
            groupData[monthIndexEnd] = []
        }
            groupData[monthIndexEnd].push(week);
    }
    return groupData;
}
function addLessonsToWeeks(DataWeeksOnMonth: WeekLessons[], lessonData: Lesson[], configureDate: any) {
    const { year, mouthNumber, countMonth } = configureDate;

    for(let lesson of lessonData) {
        const date = new Date(lesson.date);
        const dayIndexDateLesson = date.getDay();
        const monthDateLesson = date.getMonth();
        const monthForLessonInData = DataWeeksOnMonth[monthDateLesson];
        
        for(let weekLesson in monthForLessonInData) {
            const startDayWeek = monthForLessonInData[weekLesson].startWeek;
            const endDayWeek = monthForLessonInData[weekLesson].endWeek;
            const currentWeek = monthForLessonInData[weekLesson];
            
            const inRange = +startDayWeek <= +date && +date <= +endDayWeek;
            
            if(inRange) {
                console.log(currentWeek);
                if(!currentWeek.massiveLessonsOnWeek[dayIndexDateLesson]) {
                    currentWeek.massiveLessonsOnWeek[dayIndexDateLesson] = [];
                }
                currentWeek.massiveLessonsOnWeek[dayIndexDateLesson].push(lesson);
            }
        } 
    }
    return DataWeeksOnMonth;
}

function findDayMonday(date: Date) {
    const newDate = new Date(date);
    while(newDate.getDay() !== 1) {
        newDate.setDate(newDate.getDate() - 1);
    }

    return newDate;
}
