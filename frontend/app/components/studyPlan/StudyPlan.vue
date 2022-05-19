<script>
import { computed, reactive, ref } from 'vue';
import { getData } from '@/api/university';
import { adapterStudyPlan } from '@/adapters/adapterStudyPlan';

export default {
    
    async setup(props) {
        const curretnInstutute = reactive({ id: 1, name: null });
        const currentDirection = reactive({ id: 1, name: null });

        const url = 'studyPlan/';
        const { data: dataStudyPlan } = await getData(url);
        const { adaptInsitute, adaptDirection, adaptSubject } = adapterStudyPlan(dataStudyPlan);

        const changeInstitute = (selectedInstite) => {
            curretnInstutute.id = selectedInstite.id;
            curretnInstutute.name = selectedInstite.name;
        }

        const cgangeDirecton = (selectedDirection) => {
            currentDirection.id = selectedDirection.id;
            currentDirection.name = selectedDirection.name;
        }

        const filterDirectionByInstitute = computed(() => {
            const result = adaptDirection.filter((element) => { return element.institute.id === curretnInstutute.id});
            return result; 
        })

        const filterSubjectByInstitute = computed(() => {
            const result = adaptSubject.filter((subject) => {
                for(let institute of subject.institutes) {
                    if(institute.id === curretnInstutute.id ) {
                        return subject;
                    }
                }
            })
            return result;

        })

        return {
            adaptInsitute,
            changeInstitute,
            cgangeDirecton,
            filterDirectionByInstitute,
            filterSubjectByInstitute,
        }
        
    }
}
</script>
<template>
    <div class="study-plan">
        <select-data @selectValue="changeInstitute" :data="adaptInsitute"></select-data>
        <select-data @selectValue="cgangeDirecton" :data="filterDirectionByInstitute"></select-data>
        <select-data @selectValue="cgangeDirecton" :data="filterSubjectByInstitute"></select-data>
    </div>
</template>
<style lang="scss">
    
</style>