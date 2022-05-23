import dataCourse from '@/components/studyPlan/dataCourse';
import { computed, reactive, ref } from 'vue';

export default function(data) {
    const curretnInstutute = reactive({ id: null, name: null });
    const currentDirection = reactive({ id: null, name: null });
    const currentSubject = reactive({ id: null, name: null });
    let dateStart = ref(null);
    let dateEnd = ref(null);
    const currentCourse = reactive({ name: null });
    let outPutSubjects = reactive({});
    
    const { dataDirections, dataInstitutes, dataSubjects } = data;

    const changeInstitute = (selectedInstite) => {
        curretnInstutute.id = selectedInstite.id;
        curretnInstutute.name = selectedInstite.name;
        deleteAllSubjects();
    }

    const cgangeDirecton = (selectedDirection) => {
        currentDirection.id = selectedDirection.id;
        currentDirection.name = selectedDirection.name;
    }

    const cgangeSubject = (selectedSubject) => {
        currentSubject.id = selectedSubject.id;
        currentSubject.name = selectedSubject.name;
        addSubject(selectedSubject);
    }

    const changeCourse = (selectedCourse) => {
        currentCourse.name = selectedCourse.name;
    }

    const changeDateStart = (event) => {
        const date = new Date(event.target.value);
        dateStart.value = date.toJSON();
    }
    const changeDateEnd = (event) => {
        const date = new Date(event.target.value);
        dateEnd.value = date.toJSON();
    }

    const deleteSubject = (keySubject) => {
        delete outPutSubjects[keySubject];
    }

    const addSubject = (value) => {
        outPutSubjects[value.id] = value;
    }
    const deleteAllSubjects = () => {
        for(const key in outPutSubjects) {
            delete outPutSubjects[key];
        }
    }

    const filterDirectionByInstitute = computed(() => {
        const result = dataDirections.filter((direction) => { return direction.institute.id === curretnInstutute.id});
        return result; 
    })

    const filterSubjectByInstitute = computed(() => {
        const result = dataSubjects.filter((subject) => {
            for(let institute of subject.institutes) {
                if(institute.id === curretnInstutute.id ) {
                    return subject;
                }
            }
        })
        return result;

    })

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
        dateStart,
        dateEnd,
        currentCourse,
        currentDirection,
    }
}