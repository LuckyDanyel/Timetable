<script>
import { ref } from "vue";
import useModal from "@/composition/useModal/useModal";
import UploadDataUniversity from '@/components/uploadDataUniversity/UploadDataUniversity.vue'
import StudyPlan from "@/components/studyPlan/StudyPlan.vue";
import LessonInfo from "@/components/lessonInfo/LessonInfo.vue";
import Header from '@/components/header/Header.vue';

export default {
    components: {
    UploadDataUniversity,
    StudyPlan,
    LessonInfo,
    Header
},

    setup() {

        const modalUpload = useModal();
        const modalCreateStudy = useModal();
        const modalCreateLesson = useModal();
        const modalLessonInfo = useModal();

        return {
            modalUpload,
            modalCreateStudy,
            modalCreateLesson,
            modalLessonInfo,
        }
    }
}
</script>

<template>
    <Header></Header>
    <div class="main-admin">
        <div class="main-admin__wrapper">
            <dialog-modal :show="modalUpload.showModal" @close-modal="modalUpload.closeModal">
                <upload-data-university></upload-data-university>
            </dialog-modal>

            <suspense>
                <dialog-modal :show="modalCreateStudy.showModal" @close-modal="modalCreateStudy.closeModal">
                    <study-plan></study-plan>
                </dialog-modal>
            </suspense>

            <suspense>
                <dialog-modal :show="modalLessonInfo.showModal" @close-modal="modalLessonInfo.closeModal">
                    <lesson-info></lesson-info>
                </dialog-modal>
            </suspense>

            <a class="main-admin__button-upload" @click="modalUpload.openModal">Загрузка начальный данных</a>

            <a class="main-admin__button-upload" @click="modalCreateStudy.openModal">Создать план</a>

            <a class="main-admin__button-upload" @click="modalLessonInfo.openModal">Показать созданные расписания</a>

        </div>       
    </div>
</template>

<style lang="scss">

.main-admin__wrapper {
    max-width: 820px;
    width: 100%;
    margin: 0 auto;
    height: calc(100vh - 70px);    
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.main-admin__button-upload {
    font-family: RobotoSemiBold;
    font-size: 22px;
    padding: 22px 0;
    width: 100%;
    display: inline-block;
    text-align: center;
    background-color: #1283D3;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 10px;
    
}
    
</style>