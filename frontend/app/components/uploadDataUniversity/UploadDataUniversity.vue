<script>
import CardUpload from '../cardUpload/CardUpload.vue'
export default {
    components: {
        CardUpload,
    }
}
</script>

<template lang="">
    <div class="upload-univeristy">
        <card-upload nameUpload="Институты"> </card-upload>
    </div>
</template>

<style lang="scss">
    .upload-univeristy {
        max-width: 660px;
        width: 100%;
        margin: 0 auto;
    }
</style>