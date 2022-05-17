<script>
import UploadDataUniversity from '@/components/uploadDataUniversity/UploadDataUniversity.vue'

export default {
    components: {
        UploadDataUniversity,
    }
}
</script>

<template>
    <div class="main-admin">
        <div class="main-admin__wrapper">
            <upload-data-university></upload-data-university>
        </div>       
    </div>
</template>

<style lang="scss">

.main-admin__wrapper {
    max-width: 820px;
    width: 100%;
    margin: 0 auto;    
}
    
</style>