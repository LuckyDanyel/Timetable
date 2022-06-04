import { unref, ref, computed } from 'vue';
import { useStore } from 'vuex';
import useModal from '@/composition/useModal/useModal';
import convertBuildings from './converters/convertBuildings';
import convertTeachers from './converters/convertTeachers';

export default function(props, context) {

    const store = useStore();
    const { showModal, closeModal, openModal } = useModal();
    const lessonInfo = props.lessonInfo;
    const { dataLesson } = lessonInfo;
    const isEmpty = ref(Object.keys(dataLesson).length == 0);
    const role = store.state.commonStore.USER_ROLE;

    const resultLesson = ref({});
    
    const dataTypeLessonLocal = ref({});
    const dataAudinceLocal = ref({});
    const dataBuildingsLocal = ref({});
    const dataSubjectsLocal = ref({}); 
    const dataTeacherLocal = ref({});

    const currentSubject = ref({});
    const currentTeacher = ref({});
    const currentAudience = ref({});
    const curretnBuilding = ref({});
    const currentTypeLesson = ref({}); 

    if(!isEmpty.value) {
        const { subject, teacher, audience, typeLesson, building } = dataLesson;
        currentSubject.value = subject;
        currentTeacher.value = convertTeachers(teacher);
        currentAudience.value = audience;
        currentTypeLesson.value = typeLesson;
        curretnBuilding.value = building;
    }
    const addLesson = () => {
        const { dataTypeLesson, dataAudince, dataBuildings, dataSubjects } = store.state.adminStore.dataCreateLesson;
        dataTypeLessonLocal.value = dataTypeLesson;
        dataBuildingsLocal.value = convertBuildings(dataBuildings);
        dataAudinceLocal.value = dataAudince;
        dataSubjectsLocal.value = dataSubjects;
        openModal();
    }
    const changeBuilding = (takenBuilding) => {
        curretnBuilding.value = takenBuilding;
    }
    const changeTypeLesson = (takenTypeLesson) => {
        currentTypeLesson.value = takenTypeLesson;
    }
    const changeSubject = (takenSubject) => {
        currentSubject.value = takenSubject;
        const { teacher: teachers } = takenSubject;
        dataTeacherLocal.value = convertTeachers(teachers);
    }
    const changeTeacher = (takenTeacher) => {
        currentTeacher.value = takenTeacher;
    }
    const changeAudience = (takenAudience) => {
        currentAudience.value = takenAudience;
    }
    const saveLesson = () => {
        resultLesson.value.currentSubject = unref(currentSubject);
        resultLesson.value.currentTeacher = unref(currentTeacher);
        resultLesson.value.currentAudience = unref(currentAudience);
        resultLesson.value.currentTypeLesson = unref(currentTypeLesson);
        isEmpty.value = false;
        dataTypeLessonLocal.value = {};
        dataBuildingsLocal.value = {};
        dataAudinceLocal.value = {};
        dataSubjectsLocal.value = {};
        closeModal();
    }
    const filterAudienceByBuilding = computed(() => {
        const result = dataAudinceLocal.value.filter((audience) => audience.building.id === curretnBuilding.value.id);
        return result;
    })

    return {
        isEmpty,
        role,

        currentSubject,
        currentTeacher,
        currentAudience,
        currentTypeLesson,
        curretnBuilding,
        resultLesson,

        addLesson,
        showModal,
        closeModal,
        openModal,

        changeSubject,
        changeTypeLesson,
        changeBuilding,
        changeTeacher,
        changeAudience,
        saveLesson,

        filterAudienceByBuilding,
        dataBuildingsLocal,
        dataTypeLessonLocal,
        dataSubjectsLocal,
        dataTeacherLocal,
    }
}