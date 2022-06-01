<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';

import convertersLessonMonth from './converters/convertersLessonMonth';
import dateFormat from '@/adapters/dateFormat';
import LessonMoth from '@/components/lessonMonth/LessonMonth.vue';
import useModal from '@/composition/useModal/useModal';
export default {
    components: {
        LessonMoth,
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        const currentWeekParity = reactive({});
        const dataMonthWeeksLessons = reactive({});

        const dataParity = [
            {
                id: 0, name: 'Четная'
            },
            {
                id: 1, name: 'Нечетная'
            }
        ]

        const monthWeeksLessons = computed(() => {
            const dataLessonMonth = store.state.adminStore;
            return convertersLessonMonth(dataLessonMonth);
        })
        const group = computed(() => {
            return store.state.adminStore.group;
        })
        const studyPlan = computed(() => {
            return store.state.adminStore.studyPlan;
        })


        const changeWeekParity = (dataParityWeek) => {
            currentWeekParity.id = dataParityWeek.id;
            currentWeekParity.name = dataParityWeek.name;
        }

        const goToPageLessonWeek = () => {
            if(!currentWeekParity) {
                return;
            }
            const { massiveDoubleLesson } = store.state.adminStore;
            const parity = currentWeekParity.id;
            store.commit("setCurrentWeek", massiveDoubleLesson[parity]);
            router.push({ name: 'AdminWeek'})
        }

        return {
            group,
            monthWeeksLessons,
            studyPlan,
            dateFormat,
            goToPageLessonWeek,
            dataParity,
            changeWeekParity,
            ...useModal(),
        }
    }
}
</script>
<template lang="">
    <div class="admin-month">
        <div class="admin-month__wrapper">
            <div class="admin-month__container">
                <div class="admin-month__group">Группа: {{ group.name }}
                </div>
                <div class="admin-month__date">Дата расписания: {{ dateFormat(studyPlan.start_semester) }} - {{ dateFormat(studyPlan.end_semester) }} 
                </div>
            </div>
            <div class="admin-month__heading">Расписание на семместр</div>
            
            <lesson-moth v-for="lessonsMonth in monthWeeksLessons" :data="lessonsMonth"></lesson-moth>

                <dialog-modal :show="showModal" @close-modal="closeModal">
                    <select-data 
                    heading="Выберите неделю" 
                    :data="dataParity" 
                    @selectValue="changeWeekParity"
                    >
                    </select-data>
                    <div class="admin-month__margin-button">
                        <div class="admin-month__create" @click="goToPageLessonWeek">Создать расписание на неделю</div>
                    </div> 
                </dialog-modal>

            <div class="admin-month__create" @click="openModal">Создать расписание</div>
        </div>
    </div>
<router-view></router-view>
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
    .admin-month__container {
        max-width: 360px;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
    }
    .admin-month__group {
        position: relative;
        padding: 9px 20px;
        color: white;
        font-family: RobotoSemiBold;
        font-size: 16px;
        background-color: #47A7EB;
        border-radius: 5px;
        margin-bottom: 10px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    .admin-month__date {
        position: relative;
        padding: 9px 20px;
        color: white;
        font-family: RobotoSemiBold;
        font-size: 16px;
        background-color: #47A7EB;
        border-radius: 5px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    .admin-month__heading {
        padding: 15px;
        background-color: #1383D3;
        border-radius: 5px;
        font-family: RobotoSemiBold;
        font-size: 22px;
        color: white;
        text-align: center;
        margin-bottom: 15px;
    }
    .admin-month__create {
        padding: 11px;
        width: 100%;
        font-family: RobotoSemiBold;
        font-size: 16px;
        color: white;
        background-color:#1283D3;
        text-align: center;
        border-radius: 5px;
            &:hover {
                cursor: pointer;
                opacity: 0.75;
            }
    }
    .admin-month__margin-button {
        margin-top: 15px;
    }
    
</style>