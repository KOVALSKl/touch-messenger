import Cookies from 'js-cookie'

export const cookieMixin = {
  computed: {
    authToken() {
      return Cookies.get(import.meta.env.VITE_TOKEN_NAME)
    }
  }
}
