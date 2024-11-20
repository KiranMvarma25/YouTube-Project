import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { addComment, fetchUsers, getUsersForComments } from "../store/userSlice";
import { useEffect } from "react";

import { toast } from "react-toastify";

import { FaThumbsUp } from "react-icons/fa6";
import { MdThumbDown } from "react-icons/md";

function MainVideos(){
    
    let videoData = useSelector(state => state.user.allVideos);     // IMporting Video data from recux store
    // console.log("All Video Data:", videoData);

    if(videoData.length == 0){
        const savedVideos = localStorage.getItem('allVideos');
        if(savedVideos){
            videoData = JSON.parse(savedVideos);
        }
    }

    let params = useParams();                                    
    let id = params.id;

    const filteredVideo = videoData.find(video => video._id == id);         // Displaying that particular video after user clicking on the thumbnail
    // console.log("Filtered Video:", filteredVideo);

    const otherVideos = videoData.filter(video => video._id !== id);        // // Displaying that other video
    // console.log("Other Videos Data:", otherVideos);

    const dispatch = useDispatch();

    const userId = useSelector(state => state.user.userData);               // Fetching User' Data
    // console.log("USER DATA",userId._id)

    const [text,setText] = useState("");

    const [data, setData] = useState({});

    const allComments = useSelector(state => state.user.comments);          // Fetching all the comments
    // console.log("ALL COMMENTS", allComments);

    useEffect(() => {
        if(allComments.length === 0){
            const savedComments = localStorage.getItem("comments");
            if(savedComments){
                const parsedComments = JSON.parse(savedComments);
                parsedComments.forEach(comment => dispatch(addComment(comment)));
            }
        }
    }, [allComments, dispatch]);          // this useEffect runs if comments or dispatch changes                                 

    async function handleClickAddComment(e){
        e.preventDefault();
        try{
            let response = await fetch("http://localhost:7000/base/addcomment", {       // Function for storing comments in database through API(Backend)
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    comment: text,
                    commentedUser: userId._id,
                    commentedVideo: filteredVideo._id,
                }),
            });
            const result = await response.json();
            if(result.success){
                dispatch(addComment(result.Comment));;
                const updatedComments = [...allComments, result.Comment];               // If new comments are added it updates and stores the previous comments
                localStorage.setItem("comments", JSON.stringify(updatedComments));
                // console.log("Comment added successfully!");
                toast.success("Added Comment");
                setText("");
            }
            else{
                toast.error("Erron in adding the comment");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    // console.log("Text", text);

    const usersForComments = async () => {
        try{
            let response = await fetch("http://localhost:7000/base/signup", {       // Function for fetching all comments from database through API(Backend)
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(),
            });
            const result = await response.json();
            if(result.success){
                dispatch(getUsersForComments(result.User));
                // console.log("Fetched Users Successfully");
            }
            else{
                console.log("Erron in fetching users");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        usersForComments();
    },[]);

    
    const userswhoarecommented = useSelector(state => state.user.allUsers[0]);
    // console.log("Users who are Commented",userswhoarecommented);

    // const usersArray = userswhoarecommented[0];
    // console.log("Users Array", usersArray);

    const userNames = userswhoarecommented ? allComments.map(comment => {
                        const user = userswhoarecommented.find(user => user._id === comment.commentedUser);
                            return user ? user.name : null}) : [];
    // console.log("Names",userNames);

    const getUsers = async () => {
        try{
            let response = await fetch("http://localhost:7000/base/signup", {       // Function for fetching all users who are commented from database through API(Backend)
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
            });
            const result = await response.json();
            if(result.success){
                dispatch(fetchUsers(result.User));
                // console.log("Fetched Users Successfully");
            }
            else{
                console.log("Erron in fetching users");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    },[]);

    
    const fetchedUsers = useSelector(state => state.user.Users);
    // console.log("Fetched Users in Main Videos",fetchedUsers);

    return (
        <>
            <div className="mainvideos">

                {filteredVideo ? (
                    <div className="mainvideoschild1">
                        <video className="mainvideosvideo" src={filteredVideo.channelVideourl} width="95%" height="50%" controls></video>
                        <br />
                        <h1>{filteredVideo.channelVideoName}</h1>
                        <br />
                        <h2>{filteredVideo.channelVideoDescription}</h2>
                        <br />
                        <h3>
                            {
                                fetchedUsers.length > 0 ? fetchedUsers.find(user => user._id === filteredVideo.channelVideoUploader)?.name || "Unknown Uploader" : "Loading..."
                            }
                        </h3>
                        <br />
                        <div className="likesubscribe">
                                    <div className="likedislike">
                                        <h2 className="like"><FaThumbsUp />15.5k</h2>
                                        <h2 className="dislike"><MdThumbDown />1k</h2>
                                    </div>
                            <button className="signupformButton">Subscribe</button>
                        </div>
                        <br />
                        <h2>Comments</h2>
                        <input className="commentInputField" type="text" placeholder="Add Comment" onChange={e => setText(e.target.value)} />
                        <button className="signupformButton" onClick={handleClickAddComment}>Add</button>
                        <br />
                        <br />
                        {/* filters and displays correct user with his comments */}
                        <div>
                            {  
                                allComments.filter(comment => comment.commentedVideo === filteredVideo._id)  
                                            .map(comment => {
                                                const user = userswhoarecommented ? userswhoarecommented.find(user => user._id === comment.commentedUser) : null;
                                                    return user ? (
                                                        <div key={comment._id}>
                                                            <h3>by {user.name}</h3>
                                                            <h3> -- {comment.comment}</h3>
                                                            <br />
                                                        </div>
                                                    ) : null;
                                })}
                        </div>
                    </div>
                    ) : (
                        <p>Video not found!</p>
                    )}

                {/* displays other videos */}
                <div className="mainvideos2">
                    <h2>Other Videos:</h2>
                    {otherVideos.length > 0 ? (
                        otherVideos.map(video => {
                            const uploader = fetchedUsers.find(user => user._id === video.channelVideoUploader);
                            return (
                                <Link className="Router-Link" key={video._id} to={`/mainvideos/${video._id}`}>
                                    <div className="videosChild">
                                        <img className="thumbnail" src={video.channelVideoThumbnail} alt={`Thumbnail of ${video.channelVideoName}`} width="100%" height="225px" />
                                        <p className="videosChild1">{video.channelVideoName}</p>
                                        {/* <p>{video.channelVideoDescription}</p> */}
                                        <p className="videosChild2">{uploader ? uploader.name : "Unknown Uploader"}</p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <p>No other videos available.</p>
                    )}
                </div>
            
            </div>
        </>
    );
}

export default MainVideos;
