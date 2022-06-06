
<script>
import { ref, unref, toRefs, watch, computed } from 'vue';

export default {
    name: 'select-data',

    props: {
        data: null,
        heading: null,
        oldSelectValue: null,
    },

    setup(props, context) {
        const { data, oldSelectValue } = toRefs(props);

        const { heading } = props;
        const currentSelectName = ref('Выберите');
        const show = ref(false);

        const changeSelect = (index) => {
            currentSelectName.value = data.value[index]?.name;
            const selectedValue = data.value[index];
            context.emit('selectValue', selectedValue);
            show.value = false;
        }

        if(oldSelectValue.value?.id) {
            currentSelectName.value = oldSelectValue.value.name;
        }

        const toggleContainer = () => {
            show.value = !show.value;
        }

        watch(data, (data, prevdata) => {
            currentSelectName.value = 'Выберите';
        })

        return {
            changeSelect,
            toggleContainer,
            currentSelectName,
            data,
            show,
            heading,
        }
    }
}
</script>

<template>

<div class="select">
    <h2 class="select__heading">{{ heading }}</h2>
    <div class="select__wrapper">
        <h3 class="select__selected"> {{ currentSelectName }} </h3>
        <div class="select__open" @click="toggleContainer"></div>
    </div>
    <div class="select__container" v-if="show">
        <div 
            class="select__item" 
            v-for="(item, index) in data"
            :key="index"
            @click="changeSelect(index)"
        >
            <div class="select__info-container">
                    <p>{{ item.name }}</p>
                    <div class="select__info-worng" v-show="item?.isBusy"></div>
            </div>
            <div v-show="item?.isBusy" class="select__info-message">{{ item.info }}</div>
        </div>
    </div>
</div>


</template>

<style lang="scss">
    .select {
        min-width: 400px;
        position: relative;
    }
    .select__heading {
        font-size: 16px;
        font-family: RobotoRegular;
        margin-bottom: 8px;
    }
    .select__wrapper {
        width: 100%;
        border: 1px solid #2591DE;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        padding: 10px 0;
        padding-left: 15px;
        position: relative;
    }
    .select__selected {
        margin: 0;
        font-family: RobotoRegular;
        font-size: 14px;
        font-weight: normal;
    }
    .select__open {
        width: 12px;
        height: 12px;
        border-top: 2px solid #77BAEA;
        border-right: 2px solid #77BAEA;
        border-radius: 1px;
        position: absolute;
        top: 50%;
        right: 15px;
        cursor: pointer;
        transform: translate(0, -50%) rotate(135deg);

    }
    .select__container {
        border-right: 1px solid #77BAEA;
        border-left: 1px solid #77BAEA;
        background-color: white;
        width: 100%;
        position: absolute;
        z-index: 1;
        max-height: 244px;
        overflow: auto;
            p {
                margin: 0;
                padding: 0;
            }
    }

    .select__item {
        position: relative;
        font-family: RobotoRegular;
        font-size: 12px;
        padding-top: 5px;
        border-bottom: 1px solid #77BAEA;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

            &:hover {
                background-color: #bbdcf3;
                cursor: pointer;
            }
    }
    .select__info-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 5px;
        padding: 0 15px;
    }
    .select__info-worng {
        width: 15px;
        height: 15px;
        background-image: url('./imgaes/info-wrong.svg');
        background-repeat: no-repeat;
        background-position: center;

    }
    .select__info-message {
        
        display: flex;
        align-items: center;
        z-index: 1;
        width: 100%;
        padding: 15px 15px;
        background-color: #2591DE;
        top: 26px;
        left: 0px;
        font-family: RobotoRegular;
        font-size: 11px;
        color: white;
    }


</style>