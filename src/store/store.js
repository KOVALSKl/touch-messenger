import {createStore} from "vuex";

const store = createStore({
  state: {
    user: null,
    isLoggedIn: false,
    userChats: [],
  },

  mutations: {
    changeUserStatus(state, loggedIn) {
      state.isLoggedIn = loggedIn
    },

    setUserChats(state, chats) {
      state.userChats = chats;
    },

    setUser(state, user) {
      state.user = user;
    }
  }
})

export default store;
