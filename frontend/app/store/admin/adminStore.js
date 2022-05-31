import { getData } from "@/api/university"

export const adminStore = {
    state: () => ({
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
            const { monthWeeksLessons, direction, studyPlan, institute, group, idLessonInfo, groupDoubleWeeks } = data;
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
        }
    },
    actions: {
        async getDataLessonMonth({ commit }, url) {
            try {
                commit('destroyState');
                const result = await getData(url);
                const { data } = result;
                commit('setDataLessonMonth', data);
            } catch (error) {
                
            }
        }
    }
}