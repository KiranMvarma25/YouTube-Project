import { useEffect, useState } from "react";
import { Books } from "./mockdata";

import { useDispatch } from "react-redux";
import { setVideos } from "../store/userSlice";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function Videos(){

    const [videoData, setVideoData] = useState([]);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const getVideos = async () => {
        try{
            let response = await fetch('http://localhost:7000/base/getVideo', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const output = await response.json();
            if(output){
                setVideoData(output.Data);
                dispatch(setVideos(output.Data));
                localStorage.setItem('allVideos', JSON.stringify(output.Data));
                setLoading(false);
            }
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getVideos();
    },[]);

    // console.log("Videos Data",videoData);

    const filteredVideo = useSelector(state => state.user.searchedVideos);
    // console.log("Filtered Video", filteredVideo);

    return (
        <>
        <div className="videos">
            {loading ? (
                        <p>Loading videos...</p>
                        ) : videoData.length > 0 ? (
                        (filteredVideo.length > 0 ? filteredVideo : videoData).map((video) => (
                            <Link key={video._id} to={`/mainvideos/${video._id}`}>
                                <div className="videosChild">
                                    <p>{video.channelVideoName}</p>
                                    <img src={video.channelVideoThumbnail} alt={`Thumbnail of ${video.channelVideoName}`} width="350px" height="250px" controls />
                                    <p>{video.channelVideoDescription}</p>
                                </div>
                            </Link>
                        ))
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