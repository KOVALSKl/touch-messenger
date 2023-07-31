<template>
    <div class="touch-text-field-container d-flex align-center w-100 pa-1">
        <input
                class="touch-text-field w-100 pl-2 pr-1"
                :placeholder="placeholder"
                v-model="message"
        />
      <input
        class="touch-text-field w-100 pl-2 pr-1"
        placeholder="твой логин:"
        v-model="client_login"
      />
      <input
        class="touch-text-field w-100 pl-2 pr-1"
        placeholder="мой логин:"
        v-model="user_login"
      />
        <slot name="append-inner">
            <v-btn
                    color="primary"
                    class="send-message-btn"
                    size="35"
                    variant="text"
                    style="border-radius: 100%"
                    @click="sendMessage"
            >
                <send-icon/>
            </v-btn>
        </slot>
    </div>
</template>

<script>
    import SendIcon from '@/components/Icons/SendIcon'
    import Cookies from "js-cookie";

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
                client_login: '',
                user_login: ''
            }
        },
        methods: {
          sendMessage() {
            let socket = new WebSocket(`wss://fastapitouch-1-l4518065.deta.app/ws/${this.client_login}/${this.user_login}`)
            socket.onopen = function () {
              console.log("соединение установлено")
              socket.send(this.message)
            }

            socket.onmessage = function(event) {
              console.log(`Сообщение от сервера: ${event.data}`)
            }

            // socket.onclose = function(event) {
            //   if (event.wasClean) {
            //     console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            //   } else {
            //     console.log(`[close] Соединение прервано, код=${event.code} причина=${event.reason}`);
            //   }
            // };
            //
            // socket.onerror = function(error) {
            //   console.log(`${toString(error)}`);
            // };
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

    .touch-text-field {
        outline: none;
    }
</style>
