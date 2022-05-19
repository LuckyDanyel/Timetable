
<script>
import { ref, unref, toRefs } from 'vue';

export default {
    name: 'select-data',

    props: {
        data: null
    },

    setup(props, context) {
        const { data } = toRefs(props);

        const selectedData = ref(null);
        
        const findElement = (newElement) => {
            for(let element of data.value) {
                if(element.name === newElement) {
                    return element;
                }
            }
        }

        const changeSelect = () => {
            const selectedEl = findElement(unref(selectedData));
            context.emit('selectValue', selectedEl);
        }

        return {
            changeSelect,
            selectedData,
            data,
        }
    }
}
</script>

<template>
    <select class="select" v-model="selectedData" @change="changeSelect">
        <option class="select__main" disabled> Please select one</option>
        <option 
            class="select__value" 
            v-for="element in data"
            :name="element.name"
            :key="element.id"
            > 
             {{ element.name }} </option>
    </select>
</template>

<style lang="scss">
    .select {
        width: 100%;
        height: 40px;
        border-radius: 10px;
        padding-left: 10px;
        border-color: #2591DE;
    }

</style>