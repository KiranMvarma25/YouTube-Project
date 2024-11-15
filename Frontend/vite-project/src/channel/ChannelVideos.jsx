import { useEffect, useState } from "react";

function ChannelVideos(){

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:7000/base/getVideo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const output = await response.json();
            const userId = localStorage.getItem("userId");
            const userVideos = output.Data.filter(video => video.channelVideoUploader.toString() === userId);   
        } 
        catch(error){
            console.log(error);
        }
    };
    
    useEffect(() => {
        getData();
    }, []);
    
    return (
        <>
            <h3>Channel Videos</h3>
            {data.length === 0 ? (
                <p>No videos uploaded yet.</p>
                ) : (
                    data.map((video) => (
                        <div key={video._id}>
                            <p>{video.channelVideoName}</p>
                            <img src={video.channelVideoThumbnail} alt={video.channelVideoName} width="50px" />
                        </div>
                    ))
                )}
        </>
    )
}


export default ChannelVideos;