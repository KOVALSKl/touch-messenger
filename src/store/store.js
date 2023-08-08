import {createStore} from "vuex";

const store = createStore({
  state: {
    userWebSocketConnection: null,
    user: null,
    activeChat: null,
    userChats: [],
    isLoggedIn: false,
    isMessageSending: false,
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
    },

    setUserConnection(state, userWebSocketConnection){
      state.userWebSocketConnection = userWebSocketConnection;
    },

    setActiveChat(state, chatModel) {
      state.activeChat = chatModel
    },

    setIsMessageSending(state, status) {
      state.isMessageSending = status
    }
  }
})

export default store;
