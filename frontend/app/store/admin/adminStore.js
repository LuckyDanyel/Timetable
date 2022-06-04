import { getData } from "@/api/university"

export const adminStore = {
    state: () => ({
        dataCreateLesson: {},
    }),

    mutations: {
        setDataLessonCreate(state, data) {
            const { dataCreateLesson } = data;
            state.dataCreateLesson = dataCreateLesson;
        },
        destroyState(state) {
            state.dataCreateLesson = {};
        }
    },
    actions: {
        async getDataLessonCreate({ commit }, idLessonInfo) {
            try {
                commit('destroyState');
                const urlLessonEdit = `/lessonEdit/${idLessonInfo}`;
                const { data } = await getData(urlLessonEdit);
                commit('setDataLessonCreate', data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}