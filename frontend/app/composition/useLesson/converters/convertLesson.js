export default function(dataLesson) {
    const {
        resultLesson,
        periodId,
        parity,
        idLessonInfo,
        idLesson,
        dayIndex,
        date, 
    } = dataLesson;
    const {
        currentAudience, 
        currentSubject, 
        currentTeacher, 
        currentTypeLesson,
    } = resultLesson;

    const period = { id: periodId };
    const dataTypeLesson = { id: currentTypeLesson.id };
    const audience = { id: currentAudience.id };
    const subject = { id: currentSubject.id };
    const teacher = { id: currentTeacher.id };

    return {
        parity,
        idLessonInfo,
        idLesson,
        dayIndex,
        period,
        dataTypeLesson,
        audience,
        subject,
        teacher,
        date,
    }

}