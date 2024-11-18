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

const storedChannelVideo = localStorage.getItem("channelVideo");
let initialChannelVideo = null;

if(storedChannelVideo){
  try{
    initialChannelVideo = JSON.parse(storedChannelVideo);
  } 
  catch(error){
    console.error("Error parsing channel video from localStorage");
  }
}

const userSlice = createSlice({
    
    name : 'user',

    initialState : {
        userStatus : !!initialUserData,
        userData : initialUserData,
        userChannel : initialChannelVideo ? [initialChannelVideo] : [],
        allVideos : [],
        searchedVideos : [],
        comments : [],
        allUsers : [], // For Getting the Details of All Users and display the names with help of Id
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
            state.userChannel = [];
            localStorage.removeItem("user");
            localStorage.removeItem("channelVideo");
        },

        channel : (state,action) => {
            state.userChannel = [action.payload];
            localStorage.setItem("channelVideo", JSON.stringify(action.payload));
        },

        setVideos : (state, action) => {
          state.allVideos = action.payload;
        },
        SearchFilteredVideos : (state,action) => {
          state.searchedVideos = action.payload;
        },

        addComment : (state,action) => {
          state.comments.push(action.payload);
        },

        getUsersForComments : (state, action) => {
          state.allUsers = [action.payload]
        }
    }
})

export default userSlice.reducer;
export const { login, logout, channel, setVideos, SearchFilteredVideos, addComment, getUsersForComments } = userSlice.actions;