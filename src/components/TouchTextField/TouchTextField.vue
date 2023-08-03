<template>
    <div class="touch-text-field-container d-flex align-center w-100 pa-1">
        <input
                class="touch-text-field w-100 pl-2 pr-1"
                :placeholder="placeholder"
                :value="content"
                @input="$emit('update:content', $event.target.value)"
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
            },
            content: String,
        },
        emits: [
          'update:content'
        ],
        data() {
            return {
                focused: false
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
