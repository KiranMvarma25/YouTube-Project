import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('user');

let initialUserData = null;

if(storedUser){
  try{
    initialUserData = JSON.parse(storedUser);
  } 
  catch(error){
    console.error("No User Present");
  }
}

const userSlice = createSlice({
    
    name : 'user',

    initialState : {
        userStatus : !!initialUserData,
        userData : initialUserData,
        userChannel : null,
    },
        

    reducers : {
        login : (state,action) => {
            state.userStatus = true;
            state.userData = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        logout : (state,action) => {
            state.userStatus = false;
            state.userData = null;
            localStorage.removeItem("user");
        },

        channel : (state,action) => {
            state.userChannel = action.payload
        }
    }
})

export default userSlice.reducer;
export const { login, logout, channel } = userSlice.actions;