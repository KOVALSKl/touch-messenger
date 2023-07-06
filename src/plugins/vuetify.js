/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import ChatIcon from "@/components/Icons/ChatIcon";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
      chat: {
        component: () => import('../components/Icons/ChatIcon.vue'),
      },
      friends: {
        component: () => import('../components/Icons/FriendsIcon'),
      },
      settings: {
        component: () => import('../components/Icons/SettingsIcon'),
      }
  },
})
