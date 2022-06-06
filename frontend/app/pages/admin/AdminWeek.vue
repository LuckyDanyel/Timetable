<script>
import { onBeforeMount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { uploadData } from '@/api/university';
import LessonEdit from '@/components/lessonEdit/LessonEdit.vue';
import converterSendCompiledLesson from './converters/converterSendCompiledLesson';
export default {

    components: {
        LessonEdit,
    },

    setup(props) {
        const store = useStore();
        const router = useRouter();
        const massiveComplitedLesson = {};
        const massiveIdDeleteLesson = [];
        const { parity, endWeek, startWeek } = store.state.commonStore.currentWeek;
        console.log(startWeek);
        const role = store.state.commonStore.USER_ROLE;
        const idLessonInfo = store.state.commonStore.idLessonInfo;
        const typeAddLesson = store.state.adminStore.typeAddLesson;

        const massiveLessonsOnWeek = computed(() => {
            return store.state.commonStore.currentWeek.massiveLessonsOnWeek;
        })

        const addLesson = (dataLesson) => {
            const unigueIndex = dataLesson.dayIndex + dataLesson.period.id;
            massiveComplitedLesson[unigueIndex] = dataLesson;
            console.log(massiveComplitedLesson);
        }
        const deleteLesson = (idLesson) => {
            massiveIdDeleteLesson.push(idLesson);
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
        }
    }
}
</script>
<template lang="">
    <div class="admin-week">
        <h1>Страница недели</h1>
        <div class="admin-week__container">
            <div class="admin-week__day" v-for="(day, index) in massiveLessonsOnWeek">
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
                ></lesson-edit>
            </div>
            <div class="admin-week__save-result" @click="saveLessons">Сохранить расписание</div> 
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
    
</style>