import { lazy } from 'vue';
import Admin from '@/pages/admin/Admin.vue'
import User from '@/pages/user/User.vue';
import AmdinMonth from '@/pages/admin/AdminMonth.vue';
import AdminWeek from '@/pages/admin/AdminWeek.vue';
import Error from '@/pages/404/Error.vue';

export const routes = [
    {path: '/admin', component: Admin},
    {path: '/admin/month/', component: AmdinMonth, props: true },
    {path: '/admin/week/', name: 'AdminWeek', component: AdminWeek, props: true },
    {path: "/forbidden", name: 'Error', component: Error, props: true },
    {path: '/user', component: User},
]