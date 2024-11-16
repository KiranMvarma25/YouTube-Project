import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DisplayVideos() {

    const videoData = useSelector((state) => state.user.userChannel.slice(-1)[0]);

    if(!videoData){
        return (
            <div>
                <p>No video selected</p>
                <Link to="/loginuseraccount">Back</Link>
            </div>
        );
    }

    return (
        <>
            <Link to="/loginuseraccount">Back</Link>
            <h3>Video Details</h3>
            <p>{videoData.channelVideoName}</p>
            <video src={videoData.channelVideourl} width="400px" height="300px" controls></video>
        </>
    );
}

export default DisplayVideos;
