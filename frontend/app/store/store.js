import { createStore } from 'vuex';
import { adminStore } from './admin/adminStore';

export const store = createStore({
    modules: {
        adminStore,
    }
})