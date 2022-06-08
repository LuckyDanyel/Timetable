import { unref, ref, toRefs, toRef, computed, watch } from 'vue';
import { useStore } from 'vuex';
import useModal from '@/composition/useModal/useModal';
import convertBuildings from './converters/convertBuildings';
import convertTeachers from './converters/convertTeachers';
import convertLesson from './converters/convertLesson';
import createDate from './helpers/createDate';
import { getData } from '@/api/university';

export default function(props, context) {
    const store = useStore();
    const { showModal, closeModal, openModal } = useModal();
    const { lessonInfo, dayIndex, parity, idLessonInfo, startWeek, typeAddLesson} = props;
    const { dataLesson } = lessonInfo;

    const isEmpty = ref(Object.keys(dataLesson).length === 0);
    const role = store.state.commonStore.USER_ROLE;
    const currentGroup = store.state.commonStore.group;
    const currentDirection = store.state.commonStore.direction;

    let isChangeLesson = false;
    let idLesson = dataLesson.id || null;
    let date = dataLesson.date || lessonInfo.date || null;

    const isEdit = ref(lessonInfo.isEdit);
    const isReplacment = ref(dataLesson.isReplacment || false);
    
    const resultLesson = ref({});
    
    const dataTypeLessonLocal = ref({});
    const dataAudinceLocal = ref({});
    const dataBuildingsLocal = ref({});
    const dataSubjectsLocal = ref({}); 
    const dataTeacherLocal = ref([]);

    const currentSubject = ref({});
    const currentTeacher = ref({});
    const currentAudience = ref({});
    const curretnBuilding = ref({});
    const currentTypeLesson = ref({});

    const dataBusy = ref({});

    const wrongValidate = ref(false);

    const saveRsult = () => {
        resultLesson.value.currentSubject = currentSubject.value;
        resultLesson.value.currentTeacher = currentTeacher.value;
        resultLesson.value.currentAudience = currentAudience.value;
        resultLesson.value.currentTypeLesson = currentTypeLesson.value;
    }

    const deleteAll = () => {

        context.emit('deleteLessonEdit', {
            idLesson,
            dayIndex,
            periodId: lessonInfo.id,
        })
        idLesson = null;

        resultLesson.value.currentSubject = {};
        resultLesson.value.currentTeacher = {};
        resultLesson.value.currentAudience = {};
        resultLesson.value.currentTypeLesson = {};

        currentSubject.value = {};
        currentTeacher.value = {};
        currentAudience.value = {};
        currentTypeLesson.value = {};
        curretnBuilding.value = {};

        dataTypeLessonLocal.value = {};
        dataBuildingsLocal.value = {};
        dataAudinceLocal.value = {};
        dataSubjectsLocal.value = {};
        dataTeacherLocal.value = [];

        isEmpty.value = true;
    }

    const saveTeachersOnSubject = (subjectTake, dataSubjects) => {
        const { teacher: teachers } =  dataSubjects.find((subject) => subject.id === subjectTake.id);
        dataTeacherLocal.value = convertTeachers(teachers);
    }

    if(!isEmpty.value) {
        const { subject, teacher, audience, typeLesson} = dataLesson;
        const { dataSubjects } = store.state.adminStore.dataCreateLesson;
        currentSubject.value = subject;
        currentTeacher.value = convertTeachers([teacher])[0];
        currentAudience.value = audience;
        currentTypeLesson.value = typeLesson;
        const { building } = audience;

        curretnBuilding.value = convertBuildings([building])[0];

        saveTeachersOnSubject(subject, dataSubjects);

        saveRsult();
    }
    const addLesson = async () => {

        const url = `lesson/params/${dayIndex}/${parity}/${lessonInfo.id}/${idLessonInfo}`;
        const { data } = await getData(url);
        dataBusy.value = data;

        const { dataTypeLesson, dataAudince, dataBuildings, dataSubjects } = store.state.adminStore.dataCreateLesson;
        dataTypeLessonLocal.value = dataTypeLesson;
        dataBuildingsLocal.value = convertBuildings(dataBuildings);
        dataAudinceLocal.value = dataAudince;
        dataSubjectsLocal.value = dataSubjects;

        openModal();

    }
    const changeBuilding = (takenBuilding) => {
        currentAudience.value = {};
        curretnBuilding.value = takenBuilding;
    }
    const changeTypeLesson = (takenTypeLesson) => {
        currentTypeLesson.value = takenTypeLesson;
    }
    const changeSubject = (takenSubject) => {
        currentTeacher.value = {};
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

    const getDataResultLesson = () => {
        return ({
            currentSubject: currentSubject.value,
            currentTeacher: currentTeacher.value,
            currentAudience: currentAudience.value,
            currentTypeLesson: currentTypeLesson.value,
        })
    }

    const isLessonWasChanging = () => {
        if (
            resultLesson.value.currentSubject?.id === currentSubject.value.id && 
            resultLesson.value.currentTeacher?.id === currentTeacher.value.id &&
            resultLesson.value.currentAudience?.id === currentAudience.value.id &&
            resultLesson.value.currentTypeLesson?.id === currentTypeLesson.value.id
        ) {
            wrongValidate.value = true;
            return false;
        }
        wrongValidate.value = false;
        return true;
    }

    const validateData = () => {
        const getResultLesson = getDataResultLesson();
        if(!isLessonWasChanging()) {
            wrongValidate.value = true;
            return;
        }
        for(let data in getResultLesson) {
            const someDataLessonIsEmpty = Object.keys(getResultLesson[data]).length === 0;
            if(someDataLessonIsEmpty) {
                wrongValidate.value = true;
                return false;
            }
        }
        wrongValidate.value = false;
        return true;
    }

    const saveLesson = () => {
        if(validateData()) {
            if(isChangeLesson) {
                idLesson = null;
                isReplacment.value = true;
                isEdit.value = true;
            } 

            isEmpty.value = false;

            let dataStructureSendLesson = {};
            dataStructureSendLesson.resultLesson = getDataResultLesson();
            dataStructureSendLesson.idLesson = idLesson;
            dataStructureSendLesson.periodId = lessonInfo.id;
            dataStructureSendLesson.idLessonInfo = idLessonInfo;
            dataStructureSendLesson.parity = parity;
            dataStructureSendLesson.date = date;
            dataStructureSendLesson.isReplacment = isReplacment.value;
            dataStructureSendLesson.dayIndex = dayIndex;

            const dataLessonStructure = convertLesson(dataStructureSendLesson);
            context.emit('addLessonToSend', dataLessonStructure);

            dataTypeLessonLocal.value = {};
            dataBuildingsLocal.value = {};
            dataAudinceLocal.value = {};
            dataSubjectsLocal.value = {};

            closeModal();
            saveRsult();
        }
    }

    const takeReplacmentLesson = () => {
        isChangeLesson = true;
        addLesson();
    }

    const filterAudienceByBuilding = computed(() => {
        const result = dataAudinceLocal.value.filter((audience) => audience.building.id === curretnBuilding.value.id);
        return result;
    })

    const filterAudienceByBusyAudience = computed(() => {
        const { groupAudience } = dataBusy.value;
        const result = [];
        for(let audience of filterAudienceByBuilding.value) {
            if(groupAudience[audience.id]) {
                let resultMessage = 'Эта аудитория занята : ';
                const auidenceBusy = groupAudience[audience.id];
                    for(let lesson of auidenceBusy) {
                        const { lessonInfo, typeLesson, subject } = lesson;
                        const { group } = lessonInfo;
                        const firstLetter =  typeLesson.name.split('')[0];
                        resultMessage += ` ${group.name}[${firstLetter}][${subject.name}] | `;
                    }
                result.push({
                    ...audience,
                    isBusy: true,
                    info: resultMessage,
                })
            } else {
                result.push(audience);
            }
            
        }
        return result;
    })

    const filterTeachersByBusy = computed(() => {
        const { groupTeachers } = dataBusy.value;
        const result = [];
        for(let teacher of dataTeacherLocal.value) {
            if(groupTeachers[teacher.id]) {
                let resultMessage = 'Занятия с группами: ';
                const busyTeachers = groupTeachers[teacher.id];
                for(let lesson of busyTeachers) {
                    const { lessonInfo, typeLesson, subject } = lesson;
                    const { group } = lessonInfo;
                    const firstLetter =  typeLesson.name.split('')[0];
                    resultMessage += ` ${group.name}[${firstLetter}][${subject.name}] | `;
                }
                result.push({
                    ...teacher,
                    isBusy: true,
                    info: resultMessage,
                })
            } else {
                result.push(teacher);
            }
        }
        return result;
    })



    return {
        isEmpty,
        role,
        idLesson,
        dayIndex,
        parity,
        idLessonInfo,
        date,
        isEdit,
        isReplacment,
        typeAddLesson,

        currentSubject,
        currentTeacher,
        currentAudience,
        currentTypeLesson,
        curretnBuilding,
        resultLesson,

        showModal,
        closeModal,
        openModal,

        changeSubject,
        changeTypeLesson,
        changeBuilding,
        changeTeacher,
        changeAudience,
        saveLesson,
        addLesson,
        saveRsult,
        deleteAll,
        takeReplacmentLesson,

        filterAudienceByBusyAudience,
        filterTeachersByBusy,
        dataBuildingsLocal,
        dataTypeLessonLocal,
        dataSubjectsLocal,
        dataTeacherLocal,

        wrongValidate,
    }
}