
<script>
import { toRef, toRefs, ref } from '@vue/reactivity'

export default {
    name: 'loader',

    props: {
        show: Boolean,
    },

    setup(props) {
        const { show } = toRefs(props);

        return {
            show,
        }
    }
}
</script>

<template>
    <transition name="fade">
        <div class="loader" v-if="show" :class="show ? 'loader-start' : ' ' "></div>
    </transition>
</template>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: 1s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
.loader{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #2591DE;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    left: 0;
}
.loader-start:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: loader 0.5s linear infinite;
}

@keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}

</style>