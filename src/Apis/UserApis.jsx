import Axios from "./Axios";
import { GET_CONVERSATIONS, GET_MESSAGES, GET_USERS, LOGIN, LOGOUT, NEW_CONVERSATION, REGISTER, SEND_MESSAGE } from "./RouteUrls";

class UserApis {

  Register(formData) {
    return Axios.post(REGISTER, formData);
  }

  Login(Data) {
    return Axios.post(LOGIN, Data);
  }
  Logout(Data) {
    return Axios.post(LOGOUT, Data);
  }

  AllUsers(){
    return Axios.get(GET_USERS)
  }

  // Conversation apis

  ShowConversations(id){
    return Axios.get(GET_CONVERSATIONS+id)
  }
  NewConversation(Data){
    return Axios.post(NEW_CONVERSATION,Data)
  }

  // Messages apis

  ShowMessages(Cid){
    return Axios.get(GET_MESSAGES+Cid)
  }

  SendMessage(Data){
    return Axios.post(SEND_MESSAGE, Data);
  }

}

export default new UserApis();
