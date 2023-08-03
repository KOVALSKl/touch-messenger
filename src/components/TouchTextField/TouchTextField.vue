<template>
    <div class="touch-text-field-container d-flex align-center w-100 pa-1">
        <input
                class="touch-text-field w-100 pl-2 pr-1"
                :placeholder="placeholder"
                v-model="message"
        />
        <slot name="append-inner">
        </slot>
    </div>
</template>

<script>
    import SendIcon from '@/components/Icons/SendIcon'

    export default {
        name: 'TouchTextField',
        components: {
            SendIcon,
        },
        props: {
            placeholder: {
                type: String,
                default: () => 'Сообщение'
            }
        },
        data() {
            return {
                focused: false,
                message: '',
            }
        },
    }
</script>

<style>
    .touch-text-field-container {
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        outline: none;

        transition: border 200ms ease-in-out;
    }

    .touch-text-field-container:hover {
        border: 2px solid rgba(0, 0, 0, 0.4)
    }

    .touch-text-field {
        outline: none;
    }
</style>
