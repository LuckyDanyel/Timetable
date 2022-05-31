<script>
import { toRefs, unref, computed } from 'vue';
import { routeLocationKey, useRouter } from 'vue-router';
import dateFormat from '@/adapters/dateFormat';
export default {

    props: {
        data: null,
    },

    setup(props) {
        const router = useRouter();
        const { data } = toRefs(props);
        const { indexMonth, weeks } = data.value;
        const dataParity = ['Четная', 'Нечетная'];
        const nameMonthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const month = nameMonthes[indexMonth];

        const isEmpty = ((object) => {
            const { massiveLessonsOnWeek } = object;
            for(let dayIndex in massiveLessonsOnWeek) {
                const dayWeek = massiveLessonsOnWeek[dayIndex];
                for(let numberPeriods in dayWeek) {
                    const { dataLesson } = dayWeek[numberPeriods];
                    if(dataLesson.length) {
                        return true;
                    }
                }
            }
            return false;
        })

        const goToPageWeekLesson = (week) => {
            router.push({ name: 'AdminWeek', params: {dataWeek: JSON.stringify(week)}})
        }

        return {
            isEmpty,
            weeks,
            month,
            dataParity,
            dateFormat,
            goToPageWeekLesson,
        }
    }
}
</script>
<template lang="">
    <div class="lesson-month">
        <div class="lesson-month__name"> {{ month }}</div>
        <div class="lesson-month__item" v-for="week of weeks" @click="goToPageWeekLesson(week)">
            <h2 class="lesson-month__parity lesson-month__font"> {{ dataParity[week.parity] }} </h2>
            <p class="lesson-month__lesson lesson-month__lesson_bold lesson-month__font" v-if="isEmpty(week)">Составленное расписание</p>
            <p class="lesson-month__lesson lesson-month__font" v-else>Пустое расписание</p>
            <div class="lesson-month__date lesson-month__font">
                <span>Дата</span>
                <span>{{ dateFormat(week.startWeek) }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

    .lesson-month {
        display: flex;
        margin-bottom: 10px;
        
    }
    .lesson-month__name {
        font-family: RobotoRegular;
        font-size: 14px;
        color: white;
        min-width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:#1283D3;
        border-radius: 5px;
        margin-right: 5px;
    }
    .lesson-month__item {
        margin: 0 5px;
        border-radius: 5px;
        max-width: 165px;
        width: 100%;
        background-color: #47A7EB;
        padding: 12px;
            &:hover {
                opacity: 0.75;
                cursor: pointer;
            }
    }
    .lesson-month__font {
        font-family: RobotoRegular;
        font-size: 12px;
        color: #025FA1;
        font-weight: normal;
    }
    .lesson-month__parity {
        margin-top: 0;
        text-align: center;
        padding: 6px 0;
        width: 100%;
        background-color: #B8DCF6;
        border-radius: 5px;
    }
    .lesson-month__lesson {
        padding: 12px 0;
        text-align: center;
        background-color: #B8DCF6;
        border-radius: 5px;
        line-height: 14px;
    }
    .lesson-month__date {
        padding: 9px 15px;
        background-color: #B8DCF6;
        border-radius: 5px;
        line-height: 14px;
        display: flex;
        justify-content: space-between;
    }
    
</style>