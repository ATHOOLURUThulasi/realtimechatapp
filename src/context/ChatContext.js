import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { AuthContext } from "./AuthContext";
  
  export const ChatContext = createContext();
  
 export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    console.log("poo",currentUser)
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  

    const chatReducer = (state, action) => {
      console.log(action.type) 
      switch (action.type) {
       
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    console.log("react",state)
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };
// export default  ChatContextProvider ;
  