import { lazy } from 'vue';
import Admin from '@/pages/admin/Admin.vue'
import User from '@/pages/user/User.vue';
import AmdinMonth from '@/pages/admin/AdminMonth.vue';

export const routes = [
    {path: '/admin', component: Admin},
    {path: '/admin/month/:idLessonInfo', component: () => AmdinMonth, props: true },
    {path: '/user', component: User},
]