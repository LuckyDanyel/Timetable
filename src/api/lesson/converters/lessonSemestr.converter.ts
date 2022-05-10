const { DateTime } = require("luxon");
import { Lesson } from '../lesson.entity';

const massiveDays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

class WeekLessons {
    startWeek: string;
    endWeek: Date;
    massive: Lesson[];
}

class MonthSemesterLessons {
    idMonth: number;
    nameMonth: string;
    startMonth: Date;
    massiveWeeks: WeekLessons[];
}

export function lessonConverterSemestr(massiveLessons: any): any {
    const { start_semester, end_semester} = massiveLessons[0].lessonInfo.studyPlan;
    const configureDate = createConfigureWeeks(start_semester, end_semester);
    const weekStructure = createStructureWeeksLessons(configureDate);
    const weekLessonsStructure = addLessonsToWeeks(weekStructure, configureDate);
    const groupWeeks = groupWeeksOnMonth(weekStructure, configureDate);
    
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
    console.log(day);

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
    console.log(startDate.toLocaleString())
    const newDateStart = findDayMonday(startDate);

    let countDateWeek = 0;
    const result: WeekLessons[] = [];
    for(let i = 0; i < countMonth * 4; i++) {
        const week = new WeekLessons();
        const dateMonth = new Date(newDateStart);

        const dateWeekStart = new Date(dateMonth);
        dateWeekStart.setDate(dateMonth.getDate() + countDateWeek);
        week.startWeek = dateWeekStart.toLocaleString();

        const dateWeekEnd = new Date(dateMonth);
        countDateWeek = countDateWeek + 7; 
        dateWeekEnd.setDate(dateMonth.getDate() + countDateWeek - 1);
        week.endWeek = dateWeekEnd;

        dateMonth.setMonth(startDate.getMonth() + i);
        result.push(week);
    }
    return result;
}

function groupWeeksOnMonth(dataWeeks: WeekLessons[], configureDate: any) {
    const { year, mouthNumber, countMonth } = configureDate;
    const startDate = new Date(year, mouthNumber, 0);

    for(let week of dataWeeks) {

    }
}

function addLessonsToWeeks(dataWeeks: WeekLessons[], dateConfigure: any): WeekLessons[] {
    const { year, mouthNumber, countMonth } = dateConfigure;
    const groupData = {};
    for(let week of dataWeeks) {
        const monthIndexEnd = week.endWeek.getUTCMonth();
        if(!groupData[monthIndexEnd]) {
            groupData[monthIndexEnd] = []
        }
            groupData[monthIndexEnd].push(week);
    }
    return;
}

function findDayMonday(date: Date) {
    const newDate = new Date(date);
    while(newDate.getDay() !== 1) {
        newDate.setDate(newDate.getDate() - 1);
    }
    console.log(newDate.toLocaleString());

    return newDate;
}
