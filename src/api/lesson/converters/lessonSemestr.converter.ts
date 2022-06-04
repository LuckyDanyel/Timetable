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
    const { massiveLessonGroup: massiveLessons, massiveLessonGroupDouble, periods } = dataLessons;
    const configureDate = createConfigureWeeks(start_semester, end_semester);
    const weekStructure = createStructureWeeksLessons(configureDate);
    const groupWeeks = groupWeeksOnMonth(weekStructure, periods);

    const groupDoubleWeeks = createStructureDoubleLesson(massiveLessonGroupDouble, periods);
    const monthWeeksLessonsDouble = addDoubleLesson(groupWeeks, groupDoubleWeeks);
    const monthWeeksLessons = addLessonsToWeeks(monthWeeksLessonsDouble, massiveLessonGroupDouble, configureDate);
    
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
        groupDoubleWeeks,
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

function groupWeeksOnMonth(dataWeeks: WeekLessons[], periods: any): any {
    const groupData = {};
    let count = 0;
    let parity = 0;
    for(let week of dataWeeks) {
        count++;
        parity = count % 2;
        week.massiveLessonsOnWeek = {};
        week.parity = parity;
        for(let i = 1; i <= 6; i++) {
            week.massiveLessonsOnWeek[i] = {};
            let dayOnWeek = week.massiveLessonsOnWeek[i];
                for(let period of periods) {
                    period.dataLesson = [];
                    dayOnWeek[period.name] = period;
                }
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
        const dayIndex = lesson.dayIndex;
        const numberPeriods = lesson.periods;
        const dayIndexDateLesson = date.getDay();
        const monthDateLesson = date.getMonth();
        const monthForLessonInData = DataWeeksOnMonth[monthDateLesson];
        
        for(let weekLesson in monthForLessonInData) {
            const startDayWeek = monthForLessonInData[weekLesson].startWeek;
            const endDayWeek = monthForLessonInData[weekLesson].endWeek;
            const currentWeek = monthForLessonInData[weekLesson];
            
            if(date) {
                const inRange = +startDayWeek <= +date && +date <= +endDayWeek;
                if(inRange) {
                    currentWeek.massiveLessonsOnWeek[dayIndex][numberPeriods].dataLesson = lesson;
                }
            }
        } 
    }
    return DataWeeksOnMonth;
}

function addDoubleLesson(groupLessonMonth: any, dobuleWeeksStructure: any) {
    for(let monthIndex in groupLessonMonth) {
        const month = groupLessonMonth[monthIndex];
        for(let weekIndex in month) {
            const parity = month[weekIndex].parity;
            let doubleWeek = dobuleWeeksStructure[parity];
            month[weekIndex].massiveLessonsOnWeek = doubleWeek.massiveLessonsOnWeek;
        }
    }
    return groupLessonMonth;
}

function createStructureDoubleLesson(massiveDoubleLesson: Lesson[], periods: any) {
    const doubleLesson = {
        0: {
            startWeek: null,
            endWeek: null,
            parity: 0,
            massiveLessonsOnWeek: {}
        },
        1: {
            startWeek: null,
            endWeek: null,
            parity: 1,
            massiveLessonsOnWeek: {}
        }
    }
    for(let ParityWeek in doubleLesson) {
        for(let i = 1; i <= 6; i++) {
            const week = doubleLesson[ParityWeek];
            const dayIndex = i;
            week.massiveLessonsOnWeek[dayIndex] = {};
            for(let period of periods) {
                const numberPeriods = week.massiveLessonsOnWeek[i];
                period.dataLesson = {};
                numberPeriods[period.name] = period;
            }
        }
    }

    for(let lesson of massiveDoubleLesson) {
        const parity = lesson.parity;
        const dayIndex = lesson.dayIndex;
        const numberPeriods = lesson.periods;

        const weekParity = doubleLesson[parity];
        const dayWeek = weekParity[dayIndex]
        let dayPeriodNumber = dayWeek[numberPeriods];
        dayPeriodNumber.dataLesson = lesson;
        dayPeriodNumber.test = '1';
    }
    return doubleLesson;
}

function findDayMonday(date: Date) {
    const newDate = new Date(date);
    while(newDate.getDay() !== 1) {
        newDate.setDate(newDate.getDate() - 1);
    }

    return newDate;
}
