import { createStore } from 'vuex';
import { adminStore } from './admin/adminStore';
import { commonStore } from './common/commonStore';

export const store = createStore({
    modules: {
        adminStore,
        commonStore,
    }
})