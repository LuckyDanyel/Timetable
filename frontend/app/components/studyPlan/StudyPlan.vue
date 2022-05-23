<script>
import { computed, reactive, ref, unref } from 'vue';
import { getData, uploadData } from '@/api/university';
import useInstitute from '@/composition/useInstitute/useInstitute';

export default {
    
    async setup(props) {
        const loaderStart = ref(false);
        const url = 'studyPlan/';
        const { data: dataStudyPlan } = await getData(url);
        const { 
            dataInstitutes,
            dataCourse,
            changeInstitute,
            cgangeDirecton,
            cgangeSubject,
            changeCourse,
            changeDateStart,
            changeDateEnd,
            filterDirectionByInstitute,
            filterSubjectByInstitute,
            outPutSubjects,
            deleteSubject,
            currentDirection,
            dateStart,
            dateEnd,
            currentCourse,
            } = useInstitute(dataStudyPlan);

        const toArray = (object) => {
            const result = [];
            for(let key in object) {
                const value = object[key];
                result.push({...value});
            }
            return result;
        }   

        const createStudyPlan = async () => {
            loaderStart.value = true;
            const massiveSubject = toArray(outPutSubjects);
            const data = {
                dataDirections: { ...currentDirection },
                data_start: unref(dateStart),
                data_end: unref(dateEnd),
                dataSubjects: massiveSubject,
                course: currentCourse.name,
            }
            setTimeout(async () => {
                const res = await uploadData(data, url);
                loaderStart.value = false;
            }, 2000)
        }

        return {
            dataInstitutes,
            dataCourse,
            changeInstitute,
            cgangeDirecton,
            cgangeSubject,
            changeCourse,
            changeDateStart,
            changeDateEnd,
            filterDirectionByInstitute,
            filterSubjectByInstitute,
            outPutSubjects,
            deleteSubject,
            createStudyPlan,
            loaderStart,
        }
        
    }
}
</script>
<template>
    <div class="study-plan">
        <select-data 
            heading="Институты" 
            :data="dataInstitutes" 
            @selectValue="changeInstitute"
        >
        </select-data>
        <select-data 
            heading="Направления" 
            :data="filterDirectionByInstitute" 
            @selectValue="cgangeDirecton"
        >
        </select-data>
        <select-data 
            heading="Курсы" 
            :data="dataCourse" 
            @selectValue="changeCourse"
        >
        </select-data>
        <div class="study-plan__date">
            <div class="study-plan__date-conatiner">
                <h2 class="study-plan__date-heading">Дата начала семместра</h2>
                <input class="study-plan__date-item" type="date" @change="changeDateStart">
            </div>
            <div class="study-plan__date-conatiner">
                <h2 class="study-plan__date-heading">Дата конца семместра</h2>
                <input class="study-plan__date-item" type="date" @change="changeDateEnd">
            </div>
        </div>
        <div class="study-plan__subjects">
            <select-data 
                heading="Выбрать предметы"
                :data="filterSubjectByInstitute" 
                @selectValue="cgangeSubject"
            >
            </select-data>
            <div class="study-plan__output">
                <div 
                    class="study-plan__output-item" 
                    v-for="(subject, key, index) of outPutSubjects"
                    :key="index"
                    >{{ subject.name }}
                    <div class="study-plan__output-delete" @click="deleteSubject(key)"></div>
                    </div>
            </div>
        </div>
        <div class="study-plan__upload" @click="createStudyPlan">Создать план обучения
            <loader :show="loaderStart"> </loader>
        </div>
    </div>
</template>
<style lang="scss">

    .study-plan__date {
        display: flex;
        justify-content: space-between;
    }
    
    .study-plan__date-heading {
        font-size: 16px;
        font-family: RobotoRegular;
        margin-bottom: 8px;
    }
    .study-plan__date-item {
        width: 100%;
        border-radius: 10px;
        border: 1px solid #2591DE;
        height: 40px;
        padding: 0 10px;
    }

    .study-plan__output {
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 20px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    }

    .study-plan__output-item {
        position: relative;
        font-size: 14px;
        font-family: RobotoRegular;
        color: #0A588F;
        background-color: #B8DCF6;
        border-radius: 5px;
        margin-bottom: 6px;
        width: 100%;
        padding: 7px 15px;
    }
    .study-plan__output-delete {
        width: 16px;
        height: 16px;
        background-image: url('./img/delete.svg');
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
        cursor: pointer;
            &:hover {
                opacity: 0.75;
            }
    }
    .study-plan__upload {
        position: relative;
        width: 100%;
        color: white;
        background-color: #2591DE;
        display: flex;
        justify-content: center;
        padding: 13px 0;
        border-radius: 10px;
        font-family: RobotoSemiBold;
        font-size: 16px;
        cursor: pointer;
            &:hover {
                opacity: 0.75;
            }

    }
    
</style>