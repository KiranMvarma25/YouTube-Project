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
            <h3>Channel Videos</h3>
            {data.length === 0 ? (
                <p>No videos uploaded yet.</p>
                ) : (
                    data.map((video) => (
                        <Link to={'/displayvideos'} key={video._id} onClick={() => handleVideoClick(video)}>
                            <div key={video._id}>
                                <p>{video.channelVideoName}</p>
                                <img src={video.channelVideoThumbnail} alt={video.channelVideoName} width="50px" />
                            </div>
                        </Link>
                ))
                )}
        </>
    )
}


export default ChannelVideos;