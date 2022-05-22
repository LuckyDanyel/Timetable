
<script>
import { ref, unref, toRefs, watch } from 'vue';

export default {
    name: 'select-data',

    props: {
        data: null,
        heading: null,
    },

    setup(props, context) {
        const { data } = toRefs(props);
        const { heading } = props;

        const currentSelectName = ref('Выберите')
        const show = ref(false);

        const toggleContainer = () => {
            show.value = !show.value;
        }

        const changeSelect = (index) => {
            currentSelectName.value = data.value[index]?.name;
            const selectedValue = data.value[index];
            context.emit('selectValue', selectedValue);
            show.value = false;
        }

        watch(data, (data, prevdata) => {
            currentSelectName.value = ('Выберите');
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
            >{{ item.name }}</div>
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
    }

    .select__item {
        font-family: RobotoRegular;
        font-size: 12px;
        padding: 5px 0;
        padding-left: 15px;
        border-bottom: 1px solid #77BAEA;

            &:hover {
                background-color: #bbdcf3;
                cursor: pointer;
            }
    }


</style>