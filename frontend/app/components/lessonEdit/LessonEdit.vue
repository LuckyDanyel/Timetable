<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default {

    props: {
        lessonInfo: {
            required: true,
        }
    },

    setup(props) {
        const store = useStore();
        const lessonInfo = props.lessonInfo;
        const { dataLesson } = lessonInfo;
        const isEmpty = ref(Object.keys(dataLesson).length == 0);
        const role = store.state.commonStore.USER_ROLE;
        let currentSubject = reactive({ name: null });
        let currentTeacher = reactive({ name: null });
        let currentAudience = reactive({ name: null });
        let currentTypeLesson = reactive({ name: null }); 

        if(!isEmpty.value) {
            const { subject, teacher, audience, typeLesson } = dataLesson;
            currentSubject = { ...subject };
            currentTeacher = { ...teacher };
            currentAudience = { ...audience };
            currentTypeLesson = { ...typeLesson }; 
        }

        return {
            isEmpty,
            role,
            currentSubject,
            currentTeacher,
            currentAudience,
            currentTypeLesson,
        }
    }
    
}
</script>
<template lang="">
    <div class="lesson-edit">
        <div class="lesson-edit__content">
            <div class="lesson-edit__hiden" v-show="!isEmpty">
                <h2 class="lesson-edit__subject"> {{ currentSubject.name }} </h2>
                <h2 class="lesson-edit__heading"> {{ currentTeacher.name }} </h2>
                <h2 class="lesson-edit__heading"> {{ currentAudience.name }} </h2>
                <h2 class="lesson-edit__heading"> {{ currentTypeLesson.name }} </h2>

                <div class="lesson-edit__button-edit" v-show="role === 'ADMIN'">
                    <p>Редактировать</p>
                </div>
            </div>
            <div class="lesson-edit__create" v-show="isEmpty && role === 'ADMIN' ">
                <p>Добавить расписание</p>
            </div>
        </div>

    </div>
</template>
<style lang="scss">
    .lesson-edit {
        margin: 8px 0;
        max-width: 160px;
        width: 100%;
        height: 160px;
        padding: 12px;
        background-color: #47A7EB;
        border-radius: 5px;
    }
    .lesson-edit__content {
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
        margin: 0;
        margin-bottom: 5px;
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
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;

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
    
</style>