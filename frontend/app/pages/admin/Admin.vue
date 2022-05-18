<script>
import UploadDataUniversity from '@/components/uploadDataUniversity/UploadDataUniversity.vue'
import { ref } from "vue";

export default {
    components: {
        UploadDataUniversity
    },

    setup() {
        const showModalFirst = ref(false);
        const openModalFirst = () => {
            showModalFirst.value = true;
        }
        const closeModalFirst = () => {
            showModalFirst.value = false;
        }

        const showModalSecond = ref(false);
        const openModalSecond = () => {
            showModalSecond.value = true;
        }
        const closeModalSecond = () => {
            showModalSecond.value = false;
        }

        return {
            showModalFirst,
            closeModalFirst,
            openModalFirst,

            showModalSecond,
            openModalSecond,
            closeModalSecond,


        }
    }
}
</script>

<template>
    <div class="main-admin">
        <div class="main-admin__wrapper">
            <dialog-modal :show="showModalFirst" @close-modal="closeModalFirst">
                <upload-data-university></upload-data-university>
            </dialog-modal>

            <dialog-modal :show="showModalSecond" @close-modal="closeModalSecond">
                <div class="">dsaaaaaaa</div>
            </dialog-modal>

            <a class="main-admin__button-upload" @click="openModalSecond">Второе окно</a>

            <a class="main-admin__button-upload" @click="openModalFirst">Загрузка начальный данных</a>

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