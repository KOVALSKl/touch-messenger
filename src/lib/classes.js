const MessageType = {
  MESSAGE: 0,
  UPDATEUSERSTATUS: 1,
}

class Message {
  constructor(created_at, creator_login, content) {
    this.created_at = created_at;
    this.creator_login = creator_login;
    this.content = content;
  }

  toJSON() {
    return JSON.stringify({
      ...this
    })
  }
}

class WebSocketMessage {
  constructor(type, content) {
    this.type = type;
    this.content = content
  }

  toJSON() {
    return JSON.stringify({
      ...this
    })
  }
}

class UserStatus {
  constructor(auth_token, chat_id = '') {
    this.chat_id = chat_id;
    this.auth_token = auth_token
  }
}

export {
  MessageType,
  Message,
  WebSocketMessage,
  UserStatus,
}
