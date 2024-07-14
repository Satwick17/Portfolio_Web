import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotRestPassReducer from "./slices/forgotRestPassSlice";
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotRestPassReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
  },
});
