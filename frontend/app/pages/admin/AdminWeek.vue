<script>
import { onBeforeMount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { uploadData } from '@/api/university';
import LessonEdit from '@/components/lessonEdit/LessonEdit.vue';
import converterSendCompiledLesson from './converters/converterSendCompiledLesson';
import Header from '@/components/header/Header.vue';
import dataPeriods from './data/dataPeriods';
export default {

    components: {
        LessonEdit,
        Header,
    },

    setup(props) {
        const store = useStore();
        const router = useRouter();
        const massiveComplitedLesson = {};
        const massiveIdDeleteLesson = [];
        const { parity, endWeek, startWeek } = store.state.commonStore.currentWeek;
        const { group } = store.state.commonStore;
        const startDateWeek = (startWeek) ? new Date(startWeek).toLocaleDateString() : '';
        const endDateWeek = (endWeek) ? new Date(endWeek).toLocaleDateString() : '';
        const parityInfo = ['Четная', 'Нечетная'];

        const role = store.state.commonStore.USER_ROLE;
        const idLessonInfo = store.state.commonStore.idLessonInfo;
        const typeAddLesson = store.state.adminStore.typeAddLesson;

        const typeAddLessonInfo = { 'SINGLE': 'Одиночное расписание'};
        const dataDay = { '1' : 'ПН', '2' : 'ВТ', '3': 'СР', '4': 'ЧТ', '5': 'ПТ', '6': 'СБ' };
        const textAddLesson = typeAddLessonInfo[typeAddLesson] || 'Повторяющееся расписание';

        const massiveLessonsOnWeek = computed(() => {
            return store.state.commonStore.currentWeek.massiveLessonsOnWeek;
        })

        const addLesson = (dataLesson) => {
            const unigueIndex = dataLesson.dayIndex + dataLesson.period.id;
            massiveComplitedLesson[unigueIndex] = dataLesson;
            console.log({...massiveComplitedLesson});
        }
        const deleteLesson = (dataLesson) => {
            const { dayIndex, periodId, idLesson } = dataLesson;
            const unigueIndex = String(dayIndex) + String(periodId);
            delete massiveComplitedLesson[unigueIndex];
            if(idLesson) {
                massiveIdDeleteLesson.push(idLesson);
            }
            console.log({...massiveComplitedLesson});
        }
        const saveLessons = async () => {
            const urlCreate = 'lesson/create';
            const urlDelete = 'lesson/delete';
            await uploadData(massiveIdDeleteLesson, urlDelete);
            await uploadData(converterSendCompiledLesson(massiveComplitedLesson), urlCreate);
            await store.dispatch('getDataLesson', idLessonInfo);
            router.go(-1);
        }


        
        return {
            role,
            massiveLessonsOnWeek,
            idLessonInfo,
            parity,
            addLesson,
            saveLessons,
            deleteLesson,
            startWeek,
            typeAddLesson,

            parityInfo,
            group,
            startDateWeek,
            endDateWeek,
            textAddLesson,
            dataDay,
            dataPeriods,
        }
    }
}
</script>
<template lang="">
    <Header></Header>
        <div class="admin-week">
            <div class="admin-week__container">
                <div class="admin-week__info">
                    <div class="admin-week__item">
                        Дата расписания: {{ startDateWeek }} - {{ endDateWeek }}
                    </div>
                    <div class="admin-week__item">
                        Группа: {{ group.name }}
                    </div>
                    <div class="admin-week__item">
                        Неделя: {{ parityInfo[parity] }}
                    </div>
                    <div class="admin-week__item">
                        Режим: {{ textAddLesson }}
                    </div>
                </div>
                <div class="admin-week__wrapper">     
                        <div class="admin-week__week-container" v-for="(day, index) in massiveLessonsOnWeek">
                        
                        <div class="admin-week__day-info">
                            {{ dataDay[index] }}
                        </div>
                        <div class="admin-week__wrapper-period">
                            <div class="admin-week__period" v-for="period in dataPeriods"> 
                                {{ period.numberPeriod }} пара <br> {{ period.timePeriod }} 
                            </div>
                        </div>   
                        <div class="admin-week__day">
                            <lesson-edit 
                                v-for="period in day" 
                                :lessonInfo="period" 
                                :dayIndex="index"
                                :idLessonInfo="idLessonInfo"
                                :parity="parity"
                                :startWeek="startWeek"
                                :typeAddLesson="typeAddLesson"
                                @addLessonToSend="addLesson"
                                @deleteLessonEdit="deleteLesson"
                            >
                            </lesson-edit>
                        </div>
                    </div>
                </div>
                <div class="admin-week__save-result" @click="saveLessons">Сохранить расписание</div> 
            </div>
        </div>
</template>
<style lang="scss">
    .admin-week__container {
        margin: 0 auto;
        max-width: 1215px;
        margin-bottom: 20px;
    }
    .admin-week__wrapper {
        // display: flex;
        // flex-direction: column;
    }
    .admin-week__day {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .admin-week__save-result {
        width: 100%;
        padding: 12px 0;
        font-family: RobotoBold;
        font-size: 16px;
        text-align: center;
        background-color: #1283D3;
        border-radius: 5px;
        color: white;
        
        &:hover {
            cursor: pointer;
            opacity: 0.75;
        }
    }
    .admin-week__info {
        margin-top: 20px;
        max-width: 620px;
        display: flex;
        flex-wrap: wrap;
    }
    .admin-week__item {
        flex-grow: 1;
        font-family: RobotoRegular;
        padding: 10px;
        background-color: #47A7EB;
        color: white;
        text-align: center;
        margin-bottom: 10px;
        margin-right: 6px;
        border-radius: 5px;
    }
    .admin-week__week-container {
        max-width: 1215px;
        // display: flex;
        // justify-content: space-between;
    }
    .admin-week__day-info {
        border-radius: 5px;
        min-height: 100%;
        min-width: 70px;
        background-color: #1283D3;
        // margin-right: 15px;
        padding: 15px 0;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-family: RobotoBold;
        color: white;
    }
    .admin-week__week-container {
        padding: 8px 0;
    }
    .admin-week__wrapper-period {
        width: 100%;
        display: flex;
        margin-bottom: 5px;
        justify-content: space-between;
        // max-width: 1215px;
        align-self: flex-end;
    }
    .admin-week__period {
        line-height: 23px;
        max-width: 160px;
        flex-grow: 1;
        text-align: center;
        font-size: 16px;
        color: white;
        padding: 10px 0;
        border-radius: 5px;
        font-family: RobotoRegular;
        background-color: #1283D3;

    }
    
</style>