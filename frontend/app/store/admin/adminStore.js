import { getData } from "@/api/university"

export const adminStore = {
    state: () => ({
        dataCreateLesson: {},
        typeAddLesson: '',
    }),

    mutations: {
        setDataLessonCreate(state, data) {
            const { dataCreateLesson } = data;
            state.dataCreateLesson = dataCreateLesson;
        },
        setTypeAddLesson(state, data) {
            state.typeAddLesson = data;
        },
        destroyState(state) {
            state.dataCreateLesson = {};
        }
    },
    actions: {
        async getDataLessonCreate({ commit }, idLessonInfo) {
            try {
                const urlLessonEdit = `/lessonEdit/${idLessonInfo}`;
                const { data } = await getData(urlLessonEdit);
                commit('setDataLessonCreate', data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}