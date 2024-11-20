import { configureStore } from "@reduxjs/toolkit";      // Importing Store
import userReducer from "./userSlice";                  // Importing User Slice

const userStore = configureStore({
    reducer : {
        user : userReducer,                             
    }
});

export default userStore;