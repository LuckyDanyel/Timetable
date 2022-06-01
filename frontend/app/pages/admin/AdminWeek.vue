<script>
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LessonEdit from '@/components/lessonEdit/LessonEdit.vue';
export default {

    components: {
        LessonEdit,
    },

    setup(props) {
        const store = useStore();
        const massiveComplitedLesson = [];
        const role = store.state.commonStore.USER_ROLE;
        const dataWeek = store.state.commonStore.currentWeek;
        const { massiveLessonsOnWeek, parity, endWeek, startWeek } = dataWeek;

        return {
            massiveLessonsOnWeek,
        }
    }
}
</script>
<template lang="">
    <div class="admin-week">
        <h1>Страница недели</h1>
        <div class="admin-week__container">
            <div class="admin-week__day" v-for="day in massiveLessonsOnWeek">
                <lesson-edit v-for="period in day" :lessonInfo="period"></lesson-edit>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .admin-week__container {
        margin: 0 auto;
        max-width: 1150px;
    }
    .admin-week__day {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    
</style>