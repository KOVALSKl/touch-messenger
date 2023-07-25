<template>
    <div class="touch-text-field-container d-flex align-center w-100 pa-1">
        <input
                @focusin="(e) => focusedEvent(e)"
                @focusout="(e) => focusedEvent(e)"
                class="touch-text-field w-100 pl-2 pr-1"
                :placeholder="placeholder"
        />
        <slot name="append-inner">
            <v-btn
                    color="primary"
                    class="send-message-btn"
                    size="35"
                    variant="text"
                    style="border-radius: 100%"
            >
                <send-icon/>
            </v-btn>
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
            }
        },
        computed: {
          textFieldFocusClass(e) {
              switch (e.type) {
                  case 'focusin':
                      return 'touch-text-field-container-focused'
                  case 'focusout':
                  default:
                      return 'touch-text-field-container'
              }
          }
        },

        methods: {
            setFocus(e) {
                switch (e.type) {
                    case 'focusin':
                        return 'touch-text-field-container-focused'
                    case 'focusout':
                    default:
                        return 'touch-text-field-container'
                }
            }
        }
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

    .touch-text-field-container-focused {
        outline: 3px solid rgba(var(--primary-color), 0.6);
    }

    .touch-text-field {
        outline: none;
    }
</style>