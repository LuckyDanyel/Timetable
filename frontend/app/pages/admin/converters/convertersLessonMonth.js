export default function(dataLesson) {
    console.log(dataLesson);
    const { monthWeeksLessons, studyPlan } = dataLesson;
    const { end_semester, start_semester } = studyPlan;
    const monthStart = new Date(start_semester);
    const monthEnd = new Date(end_semester);
    const timeDiff = Math.abs(monthStart.getTime() - monthEnd.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    const countMonth = Math.ceil(diffDays / 30);
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