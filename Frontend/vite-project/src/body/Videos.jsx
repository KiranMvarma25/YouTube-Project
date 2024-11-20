import { useEffect, useState } from "react";
import { Books } from "./mockdata";

import { useDispatch } from "react-redux";
import { fetchUsers, setVideos } from "../store/userSlice";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function Videos(){

    const [videoData, setVideoData] = useState([]);    

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const getVideos = async () => {                                 // Function for fetching all videos from database through API(Backend)
        try{
            let response = await fetch('http://localhost:7000/base/getVideo', {     // Sending a GET request to the server to fetch the video 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const output = await response.json();
            if(output){
                setVideoData(output.Data);
                dispatch(setVideos(output.Data));                                   // Storing data in redux store
                localStorage.setItem('allVideos', JSON.stringify(output.Data));
                setLoading(false);
            }
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     getVideos();
    // },[]);

    // console.log("Videos Data",videoData);

    const filteredVideo = useSelector(state => state.user.searchedVideos);
    // console.log("Filtered Video", filteredVideo);

    const getUsers = async () => {                                                  // Function for fetching all Users Details from database through API(Backend)
        try{
            let response = await fetch("http://localhost:7000/base/signup", {       // Sending a GET request to the server to fetch the User Details        
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
            });
            const result = await response.json();
            if(result.success){
                dispatch(fetchUsers(result.User));          // Storing data in redux store
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
        getVideos();
        getUsers();
    },[]);

    
    const fetchedUsers = useSelector(state => state.user.Users);                    // Fetching the users who are commented
    // console.log("Fetched Users",fetchedUsers);

    return (
        <>
        <div className="videos">
            {loading ? <p>Loading videos...</p> : 
                    videoData.length > 0 ? ( (filteredVideo.length > 0 ? filteredVideo : videoData).map(video => {
                        const uploader = fetchedUsers.find(user => user._id === video.channelVideoUploader);
                        return (
                            <Link className="Router-Link" key={video._id} to={`/mainvideos/${video._id}`}>
                                <div className="videosChild">
                                    <img className="thumbnail" src={video.channelVideoThumbnail} alt={`Thumbnail of ${video.channelVideoName}`} width="100%" height="225px" />
                                    <p className="videosChild1">{video.channelVideoName}</p>
                                    {/* <p className="videosChild2">{video.channelVideoDescription}</p> */}
                                    <p className="videosChild2">{uploader ? uploader.name : "Unknown Uploader"}</p>
                                    <p className="videosChild3">150k views</p>
                                </div>
                            </Link>
                        );
                    })
            ) : (
                <p>No videos available.</p>
            )}
        </div>
        {/* <div className="videos">
            {
                Books.map(book => (
                    <div className="videosChild">
                        <img src={book.coverImage} alt={`Image of ${book.title}`} width="350px" height="250px" />
                    </div>
                ))
            }
        </div> */}
        </>
    )
}


export default Videos;