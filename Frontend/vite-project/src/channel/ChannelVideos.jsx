import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { channel } from "../store/userSlice";

function ChannelVideos(){

    const [data, setData] = useState([]);

    const userDetails = useSelector(store => store.user.userData);
    console.log("userDetails", userDetails);

    const userId = userDetails?._id;

    const dispatch = useDispatch();

    const getData = async () => {
        try{
            const response = await fetch(`http://localhost:7000/base/channelVideos/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const output = await response.json();
            if(output.data){
                setData(output.data);
                dispatch(channel(output));
            } 
            else{
                setData([]);
            }   
        } 
        catch(error){
            console.log(error);
        }
    };

    const handleVideoClick = async (video) => {
        dispatch(channel(video));
    };
    
    useEffect(() => {
        getData();
    }, []);

    console.log("Channel Data",data);
    
    return (
        <>
            {/* <div> */}
                {data.length === 0 ? (
                    <h4>No videos uploaded yet.</h4>
                    ) : (
                        data.map((video) => (
                            <Link className="Router-Link" to={'/displayvideos'} key={video._id} onClick={() => handleVideoClick(video)}>
                                <div key={video._id} className="videosChild">
                                    <img className="thumbnail" src={video.channelVideoThumbnail} alt={video.channelVideoName} width="100%" height="250px" />
                                    <p className="videosChild1">{video.channelVideoName}</p>
                                </div>
                            </Link>
                    ))
                    )}
            {/* </div> */}
        </>
    )
}


export default ChannelVideos;