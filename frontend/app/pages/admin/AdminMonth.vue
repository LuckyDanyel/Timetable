<script>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getData } from '@/api/university';
import convertersLessonMonth from './converters/convertersLessonMonth';
import dateFormat from '@/adapters/dateFormat';
import LessonMoth from '@/components/lessonMonth/LessonMonth.vue';
export default {
    components: {
        LessonMoth,
    },

    setup() {
        const lessonsMonthes = ref(null);
        let idLessonInfo = ref(null);
        let group = ref({});
        let startSemester = ref(null);
        let endSemester = ref(null);

        onMounted(async () => { 
            const route = useRoute();
            idLessonInfo.value = route.params.idLessonInfo;
            const url = `/lesson/${idLessonInfo.value}`;
            const { data } = await getData(url);
            group.value = data.group;
            const {end_semester, start_semester} = data.studyPlan;
            startSemester.value = start_semester;
            endSemester.value = end_semester;
            lessonsMonthes.value = convertersLessonMonth(data);
        })

        return {
            lessonsMonthes,
            group,
            startSemester,
            endSemester,
            dateFormat
        }
    }
}
</script>
<template lang="">
    <div class="admin-month">
        <div class="admin-month__wrapper">
            <div clss="admin-month__container">
                <div class="admin-month__group">Группа: {{ group.name }}</div>
                <div class="admin-month__group">Дата расписания: {{ dateFormat(startSemester) }} - {{ dateFormat(endSemester) }} </div>
            </div>
            <lesson-moth v-for="lessonsMonth in lessonsMonthes" :data="lessonsMonth"></lesson-moth>
        </div>
    </div>
</template>
<style lang="scss">

    .admin-month {
        display: flex;
        justify-content: center;
    }
    .admin-month__wrapper {
        max-width: 960px;
        width: 100%;
    }
    
</style>