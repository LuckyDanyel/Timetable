<script >

export default {
    
    beforeMount() {
        const userRole = "ADMIN";
        if(userRole === "ADMIN") {
            this.$router.push('/admin');
            return;
        }
        this.$router.push('/user');
    }

}


</script>

<template>
    <router-view></router-view>
</template>

<style lang="scss">
    
</style>