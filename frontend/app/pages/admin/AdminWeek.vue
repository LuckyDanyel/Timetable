<script>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {

    setup(props) {
        const route = useRoute();
        const dataWeek = JSON.parse(route.params.dataWeek);
        console.log(dataWeek);
        
    }
}
</script>
<template lang="">
    <div>
        <h1>Страница недели</h1>
    </div>
</template>
<style lang="scss">
    
</style>