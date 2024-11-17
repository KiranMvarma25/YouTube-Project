import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

function MainVideos(){
    
    let videoData = useSelector(state => state.user.allVideos);
    console.log("All Video Data:", videoData);

    if(videoData.length == 0){
        const savedVideos = localStorage.getItem('allVideos');
        if(savedVideos){
            videoData = JSON.parse(savedVideos);
        }
    }

    let params = useParams();
    let id = params.id;

    const filteredVideo = videoData.find(video => video._id == id);
    console.log("Filtered Video:", filteredVideo);

    const otherVideos = videoData.filter(video => video._id !== id);
    console.log("Other Videos Data:", otherVideos);

    return (
        <>
            <div className="mainvideos">

                {filteredVideo ? (
                    <div className="mainvideoschild1">
                        <h1>{filteredVideo.channelVideoName}</h1>
                        <video className="mainvideosvideo" src={filteredVideo.channelVideourl} width="100%" height="50%" controls></video>
                        <h3>{filteredVideo.channelVideoDescription}</h3>
                        <h4>Likes</h4>
                        <h4>Subscribers</h4>
                        <h4>Comments</h4>
                    </div>
                    ) : (
                        <p>Video not found!</p>
                    )}
                
                <div className="mainvideos2">
                    <h2>Other Videos:</h2>
                    {otherVideos.length > 0 ? (
                        otherVideos.map((video) => (
                            <Link key={video._id} to={`/mainvideos/${video._id}`}>
                                <div className="videosChild">
                                    <p>{video.channelVideoName}</p>
                                    <img  src={video.channelVideoThumbnail} alt={`Thumbnail of ${video.channelVideoName}`} width="350px" height="250px" />
                                    <p>{video.channelVideoDescription}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No other videos available.</p>
                    )}
                </div>
            
            </div>
        </>
    );
}

export default MainVideos;
