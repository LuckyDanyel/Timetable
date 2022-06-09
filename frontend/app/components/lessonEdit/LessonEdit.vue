<script>
import useLesson from '@/composition/useLesson/useLesson'

export default {

    props: {
        lessonInfo: {
            required: true,
        },
        dayIndex: {
            required: true,
        },
        idLessonInfo: {
            required: true,
        },
        parity: {
            required: true,
        },
        startWeek: {
            required: true,
        },
        typeAddLesson: {
            required: true,
        },
    },

    setup(props, contenxt) {
       
       return {
           ...useLesson(props, contenxt)
       }
    }
    
}
</script>
<template lang="">
    <div class="lesson-edit">
        <div class="lesson-edit__content" v-if="role === 'ADMIN'">
            <div class="lesson-edit__hiden" v-if="!isEmpty">

                <h2 class="lesson-edit__subject"> {{ resultLesson.currentSubject.name }} </h2>
                <div class="lesson-edit__change">
                    <h2 class="lesson-edit__heading"> {{ resultLesson.currentTeacher.nameInitials }} </h2>
                    <div class="lesson-edit__change-img" v-show="isReplacment"></div>
                </div>
                <h2 class="lesson-edit__heading"> {{ resultLesson.currentAudience.name }} </h2>
                <h2 class="lesson-edit__heading"> {{ resultLesson.currentTypeLesson.name }} </h2>

                <div class="lesson-edit__container" v-if="isEdit">
                    <div class="lesson-edit__button-edit">
                        <p @click="addLesson">Редактировать</p>
                    </div>
                    <div class="lesson-edit__button-edit">
                        <p @click="deleteAll">Удалить</p>
                    </div>
                </div>
                <div class="lesson-edit__add-change lesson-edit__create" v-if="!isEmpty && typeAddLesson === 'SINGLE' && !isEdit">
                    <p @click="takeReplacmentLesson"> Поставить замену </p>
                </div>
            </div>
            
            <div class="lesson-edit__create" v-if="isEmpty">
                <p @click="addLesson">Добавить расписание</p>
            </div>

        </div>
        <dialog-modal :show="showModal" @close-modal="closeModal">
            <select-data 
                :heading="'Выбрать тип занятия'" 
                :data="dataTypeLessonLocal"
                :oldSelectValue="currentTypeLesson"
                @selectValue="changeTypeLesson"
            >
            </select-data>
            <select-data 
                :heading="'Выбрать корпус'" 
                :data="dataBuildingsLocal"
                :oldSelectValue="curretnBuilding" 
                @selectValue="changeBuilding"
            >
            </select-data>

            <select-data 
                :heading="'Выбрать предмет'"
                :data="dataSubjectsLocal"
                :oldSelectValue="currentSubject" 
                @selectValue="changeSubject"
            >
            </select-data>

            <select-data 
                :heading="'Выбрать преподавателя'"
                :data="filterTeachersByBusy"
                :oldSelectValue="currentTeacher"
                @selectValue="changeTeacher"
                
            >
            </select-data>

             <select-data 
                :heading="'Выбрать аудиторию'"
                :data="filterAudienceByBusyAudience"
                :oldSelectValue="currentAudience" 
                @selectValue="changeAudience"
            >
            </select-data>

            <div class="lesson-edit__save" :style="[wrongValidate ? {'background-color' : '#de2525'} : {'background-color': '#2591DE'}]" @click="saveLesson">Сохранить</div>

        </dialog-modal>
    </div>
</template>
<style lang="scss">
    .lesson-edit {
        max-width: 160px;
        width: 100%;
        height: 195px;
        padding: 12px;
        background-color: #47A7EB;
        border-radius: 5px;
    }
    .lesson-edit__container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .lesson-edit__content {
        height: 100%;
    }
    .lesson-edit__hiden {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .lesson-edit__heading {
        font-family: RobotoRegular;
        font-size: 14px;
        color: white;
        font-style: normal;
        font-weight: 400;
        margin: 0 auto;
        margin-bottom: 5px;
        max-width: 100px;
        width: 100%;
        text-align: center;
    }
    .lesson-edit__change {
        width: 100%;
        position: relative;
        text-align: center;
    }

    .lesson-edit__change-img {
        width: 19px;
        height: 16px;
        background-image: url('./img/change-teacher.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        right: 0;
            &:hover {
                cursor: pointer;
            }
    }
    .lesson-edit__subject {
        word-break: break-all;
        font-family: RobotoBold;
        font-size: 16px;
        margin: 0;
        margin-bottom: 9px;
        color: white;
        
    }
    .lesson-edit__button-edit {
        display: flex;
        align-items: flex-end;
        justify-content: center;

            &:first-child {
                margin-bottom: 7px;
            }

            p {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                background-color: #B8DCF6;
                color: #025FA1;
                border-radius: 5px;
                width: 100%;
                height: 25px;
                margin: 0;
                font-family: RobotoRegular;
            }
            &:hover {
                   cursor: pointer;
                   opacity: 0.75;
            }
    }
    .lesson-edit__create {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

            p {
                font-family: RobotoRegular;
                width: 100%;
                height: 50%;
                margin: 0;
                display: inline-flex;
                align-items: center;
                text-align: center;
                background-color: #B8DCF6;
                color: #025FA1;
                border-radius: 5px;
                font-size: 14px;
                    &:hover {
                        opacity: 0.75;
                        cursor: pointer;
                    }
            }

    }
    .lesson-edit__save {
        width: 100%;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: RobotoBold;
        font-size: 16px;
        background-color: #2591DE;
        border-radius: 5px;
        margin-top: 15px;

        &:hover {
            cursor: pointer;
            opacity: 0.75;
        }
    }
    .lesson-edit__add-change {
        
        p {
            height: 70%;
            justify-content: center;
        }
    }
    
</style>