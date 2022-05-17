<script>
import { ref, computed } from "vue";
export default {
    
    props: {
        nameUpload: String,
    },
    setup() {
        const excelFile = ref(null);
        const nameFile = ref("Выберите файл");

        function setValue(event) {
            if(event.target?.files[0]?.name) {
                nameFile.value = event.target.files[0].name;
                return;
            }
            nameFile.value = "Выберите файл";
        }
        return {
            excelFile,
            nameFile,
            setValue,
        }
    },
}
</script>

<template lang="">
    <div class="card-upload">
        <h2 class="card-upload__h2">{{ nameUpload }}</h2>
        <form class="card-upload__form" action="">
            <div class="card-upload__wrapper">
                <input type="file" class="card-upload__input" @change="this.setValue" name="excel" id="file" required="required">
                <label for="file" class="card-upload__button">Загрузить файл</label>
                <p class="card-upload__text">{{ this.nameFile }}</p>
            </div>
        </form>
    </div>
</template>

<style lang="scss">
    @import url('@/scss/main.scss');

    .card-upload {
        max-width: 320px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        border-radius: 20px;
        padding-top: 40px;
        padding-bottom: 20px;
    }
    .card-upload__form {
        width: 100%;
    }
    .card-upload__wrapper {
        position: relative;
        max-width: 160px;
        margin: 0 auto;
        width: 100%;
        height: auto;
        
    }

    .card-upload__input {
        display: none;
    }
    .card-upload__input:valid + .card-upload__button {
        background-color: #47A7EB;
    }
    .card-upload__button {
        display: inline-block;
        width: 100%;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background-color: rgb(187, 5, 5);
        font-family: RobotoRegular;
        color: white;
        border-radius: 10px;
            &:hover {
                cursor: pointer;
            }
    }
    .card-upload__h2 {
        font-family: RobotoBold;
        font-size: 22px;
    }
    .card-upload__text {
        text-align: center;
        font-size: 14px;
        font-family: RobotoRegular;
    }
</style>