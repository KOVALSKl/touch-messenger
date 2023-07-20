import {createStore} from "vuex";

const store = createStore({
  state: {
    isLoggedIn: false
  },

  mutations: {
    changeUserStatus(state, loggedIn) {
      state.isLoggedIn = loggedIn
    }
  }
})

export default store;
