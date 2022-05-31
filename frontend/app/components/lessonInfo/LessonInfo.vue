<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getData } from '@/api/university'
import { useStore } from 'vuex';
import dateFormat from '@/adapters/dateFormat';

export default {
    async setup(props, context) {
        const store = useStore();
        const router = useRouter();
        const url = 'lessonInfo/get';
        const { data: massiveLessonInfo } = await getData(url);

        const goToAdminMonth = async (idLessonInfo) => {
            const url = `/lesson/${idLessonInfo}`;
            await store.dispatch('getDataLessonMonth', url);
            router.push({ path: `/admin/month/`})
        } 

        return {
            massiveLessonInfo,
            dateFormat,
            goToAdminMonth,
        }
    }
}
</script>
<template lang="">
    <div class="lesson-info">
        <h2 class="lesson-info__heading">Созданное расписание</h2>
        <div class="lesson-info__row">
            <div class="lesson-info__item lesson-info__up lesson-info__first">Название группы</div>
            <div class="lesson-info__item lesson-info__up lesson-info__third">Дата начала семместра</div>
            <div class="lesson-info__item lesson-info__up lesson-info__four">Дата окончания семместра</div>
            <div class="lesson-info__item lesson-info__up lesson-info__five">Курс</div>
        </div>
        <div class="lesson-info__row" v-for="lessonInfo in massiveLessonInfo">
            <div class="lesson-info__item lesson-info__value lesson-info__first">{{ lessonInfo.group.name }}</div>
            <div class="lesson-info__item lesson-info__value lesson-info__third">{{ dateFormat(lessonInfo.studyPlan.start_semester) }}</div>
            <div class="lesson-info__item lesson-info__value lesson-info__four">{{ dateFormat(lessonInfo.studyPlan.end_semester) }}</div>
            <div class="lesson-info__item lesson-info__value lesson-info__five">{{ lessonInfo.group.course }}</div>
            <div class="lesson-info__button" @click="goToAdminMonth(lessonInfo.id)">Открыть</div>
        </div>
    </div>
    <router-view></router-view>
</template>
<style lang="scss">
    .lesson-info {
        &__first {
            min-width: 175px;
        }
        &__second {
            min-width: 215px;
        }
        &__third {
            min-width: 225px;
        }
        &__four {
            min-width: 251px;
        }
        &__five {
            min-width: 80px;
        }
    }
    .lesson-info__heading {
        text-align: center;
        font-family: RobotoBold;
        font-size: 22px;
    }
    .lesson-info__row {
        display: flex;
        width: 100%;
        align-items: center;
            .lesson-info__item {
            border: 1px solid #2591DE;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            height: 40px;
                &:first-child {
                    border-top-left-radius: 8px;
                }
                &:last-child {
                    border-top-right-radius: 8px;
                }
                &:not(:nth-child(4)) {
                    border-right: none;
                }
            }
            .lesson-info__value {
                font-family: RobotoRegular;
                border-top: 0;
                    &:first-child {
                        border-top-left-radius: 0px;
                    }
            }
    }
    .lesson-info__up {
        font-family: RobotoSemiBold;
        padding: 10px 20px;
    }
    .lesson-info__button {
        min-width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2591DE;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        font-family: RobotoRegular;
        font-size: 14px;
        color: white;
        margin-left: 3px;
        height: 38px;
        cursor: pointer;
            &:hover {
                opacity: 0.75;
            }
    }
</style>