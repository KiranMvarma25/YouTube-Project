import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

function DisplayVideos() {

    const videoData = useSelector((state) => state.user.userChannel.slice(-1)[0]);  // extracts the last item from the `userChannel` array in the Redux state.

    if(!videoData){
        return (
            <div>
                <Link className="backButton" to={"/loginuseraccount"}>Back</Link>
            </div>
        );
    }

    const handleClickDeleteVideo = async () => {                                    // Function for Deleting the Video Data in Database
        try{
            const response = await fetch(`http://localhost:7000/base/deleteVideo/${videoData.channelVideoUploader}`, {  // Sending a DELETE request to the server to remove the video based on the uploader's ID
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ videoId: videoData._id }),
            });

            const result = await response.json();

            if(response.ok){
                toast.success("Video Deleted Successfully");
                localStorage.removeItem("channelVideo");
                setTimeout(() => {
                    toast.info("Refresh the page");
                },1000);
            } 
            else{
                alert(result.msg || "Failed to delete the video");
            }
        } 
        catch(error){
            console.error("Error deleting video:", error);
            alert("An error occurred while deleting the video");
        }
    };

    // console.log("Display Videos",videoData);

    return (
        <>
            <br />
            <div className="backdeletevideoindisplayvideo">
                <Link className="Router-Link" to={"/loginuseraccount"}><button className="signupformButton">Back</button></Link>
                <button onClick={handleClickDeleteVideo} className="signupformButton">Delete Video</button>
            </div>

            <br />
            <br />
            
            <div>
                <h2 className="displayVideoDetails">Video Details</h2>
                <br />
                <h3 className="displayVideoDetails">Video Title : {videoData.channelVideoName}</h3>
                <br />
                <h3 className="displayVideoDetails">Video Description : {videoData.channelVideoDescription}</h3>
            </div>

            <br />
            
            <div className="displayedVideo">
                <video className="displayVideoChild" src={videoData.channelVideourl} width="75%"  controls></video>
            </div>

        </>
    );
}

export default DisplayVideos;