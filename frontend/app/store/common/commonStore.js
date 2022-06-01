import { getData } from "@/api/university"

export const commonStore = {
    state: () => ({
        USER_ROLE: 'ADMIN',
        currentWeek: {},
    }),

    mutations: {
        setCurrentWeek(state, dataWeek) {
            state.currentWeek = dataWeek;
        }
    }
}