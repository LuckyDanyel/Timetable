
<script>
import { ref, unref, toRefs, toRef, computed } from "vue";

export default {
    name: 'dialog-modal',

    props: {
        show: Boolean,
    },

    setup(props, context) {
        const { show } = toRefs(props)

        const close = () => {
            context.emit('close-modal', false);
        }

        return {
            close,
            show,
        }
    }
}
</script>

<template>
  <div class="dialog" v-if="show">
    <div class="dialog__content">
        <div class="dialog__close">
            <a class="dialog__close-button" @click="close"></a>
        </div>
        <div class="dialog__wrapper">
            <slot></slot>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
    .dialog {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
        overflow: auto;
        padding-top: 20px;
    }
    .dialog__close {
        width: 100%;
        height: 40px;
        text-align: right;
    }
    .dialog__close-button {
        margin-top: 10px;
        margin-right: 10px;
        text-align: center;
        width: 20px;
        height: 20px;
        position: relative;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        transform: rotate(45deg);
            &::after {
                content: ' ';
                display: block;
                position: absolute;
                height: 3px;
                width: 100%;
                background-color: black;
                border-radius: 5px;
            }
            &::before {
                content: ' ';
                display: block;
                position: absolute;
                height: 3px;
                width: 100%;
                border-radius: 5px;
                background-color: black;

                transform: rotate(90deg)

            }
    }
    .dialog__wrapper {
        padding: 20px;
        padding-top: 0;
    }
    .dialog__content {
        margin: auto;
        background: white;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
    }
</style>