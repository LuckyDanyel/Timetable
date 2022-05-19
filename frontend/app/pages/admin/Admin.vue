<script>
import { ref } from "vue";
import UploadDataUniversity from '@/components/uploadDataUniversity/UploadDataUniversity.vue'
import useModal from "@/composition/useModal/useModal";
import StudyPlan from "@/components/studyPlan/StudyPlan.vue";
import { getData } from "@/api/university";

export default {
    components: {
    UploadDataUniversity,
    StudyPlan,
},

    setup() {

        const modalUpload = useModal();
        const modalCreateStudy = useModal();

        return {
            modalUpload,
            modalCreateStudy,
        }
    }
}
</script>

<template>
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

            <a class="main-admin__button-upload" @click="modalUpload.openModal">Загрузка начальный данных</a>

            <a class="main-admin__button-upload" @click="modalCreateStudy.openModal">Создать план</a>

        </div>       
    </div>
</template>

<style lang="scss">
    @import url('@/scss/main.scss');

.main-admin__wrapper {
    max-width: 820px;
    width: 100%;
    margin: 0 auto;    
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
    
}
    
</style>