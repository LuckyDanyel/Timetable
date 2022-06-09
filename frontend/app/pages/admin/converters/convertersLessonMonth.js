export default function(dataLesson) {

    const { monthWeeksLessons, studyPlan } = dataLesson;
    const { end_semester, start_semester } = studyPlan;
    const monthStart = new Date(start_semester);
    const countMonth = Object.keys(monthWeeksLessons).length;
    const result = [];
    for(let i = 0; i < countMonth; i++) {
        const indexMonth = monthStart.getMonth();
        const data = {
            indexMonth,
            weeks: {
                ...monthWeeksLessons[indexMonth]
            }
        }
        result.push(data);
        monthStart.setMonth(monthStart.getMonth() + 1);
    }
    return result;
}