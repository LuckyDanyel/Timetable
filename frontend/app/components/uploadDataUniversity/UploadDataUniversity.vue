<script>
import CardUpload from '../cardUpload/CardUpload.vue'
import { dataCard } from './data/dataCard';
import { uploadData } from '@/api/university';

export default {
    components: {
        CardUpload,
    },
    setup(props, context) {
        const universityDataSend = {};

        const addFile = (dataUpload) => {
            const { position } = dataUpload;
            universityDataSend[position] = dataUpload;
        } 

        const sendFiles = async () => {
            for(let position in universityDataSend) {
                try {
                    const data = universityDataSend[position];
                    const { excelData, api:url } = data;
                    await uploadData(excelData, url);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        return {
            dataCard,
            addFile,
            sendFiles,
        }
    }
}
</script>

<template lang="">
    <div class="upload-univeristy">
        <card-upload
            v-for="card in dataCard"
            :nameUpload="card.name"
            :position="card.position"
            :api="card.api"
            @uploadFile="addFile"
            > 
        </card-upload>
        <a @click="sendFiles" class="upload-univeristy__button">Загрузить данные</a>
        <loader></loader>
    </div>
</template>

<style lang="scss">
    .upload-univeristy {
        max-width: 660px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .upload-univeristy__button {
        display: inline-block;
        width: 100%;
        padding: 10px;
        text-decoration: none;
        background-color: #1283D3;
        font-family: RobotoSemiBold;
        text-align: center;
        color: white;
        border-radius: 8px;
        cursor: pointer;

    }
</style>