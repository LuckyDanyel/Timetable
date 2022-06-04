import { getData } from "@/api/university"

export const commonStore = {
    state: () => ({
        USER_ROLE: 'ADMIN',
        currentWeek: {},
        monthWeeksLessons: {},
        direction: {},
        studyPlan: {},
        institute: {},
        group: {},
        idLessonInfo: null,
        massiveDoubleLesson: {},
    }),

    mutations: {
        setDataLessonMonth(state, data) {
            const { monthWeeksLessons, direction, studyPlan, institute, group, idLessonInfo, groupDoubleWeeks} = data;
            console.log(data);
            state.monthWeeksLessons = monthWeeksLessons;
            state.direction = direction;
            state.studyPlan = studyPlan;
            state.institute = institute;
            state.group = group;
            state.idLessonInfo = idLessonInfo;
            state.massiveDoubleLesson = groupDoubleWeeks;
        },
        destroyState(state) {
            state.monthWeeksLessons = {};
            state.direction = {};
            state.studyPlan = {};
            state.institute = {};
            state.group = {};
            state.idLessonInfo = null;
            state.massiveDoubleLesson = {};
        },
        setCurrentWeek(state, dataWeek) {
            state.currentWeek = dataWeek;
        }
    },
    actions: {
        async getDataLesson({ commit }, idLessonInfo) {
            try {
                commit('destroyState');
                const urlLesson = `/lesson/${idLessonInfo}`;
                const { data } = await getData(urlLesson);
    
                commit('setDataLessonMonth', data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
