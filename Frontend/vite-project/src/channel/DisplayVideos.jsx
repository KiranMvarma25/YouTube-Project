import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

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

    const handleClickDeleteVideo = async () => {
        try{
            const response = await fetch(`http://localhost:7000/base/deleteVideo/${videoData.channelVideoUploader}`, {
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

    return (
        <>
            <Link to="/loginuseraccount">Back</Link>
            <h3>Video Details</h3>
            <p>{videoData.channelVideoName}</p>
            <video src={videoData.channelVideourl} width="400px" height="300px" controls></video>
            <p>{videoData.channelDescription}</p>
            <br />
            <br />
            <button onClick={handleClickDeleteVideo} className="signupformButton">Delete Video</button>
        </>
    );
}

export default DisplayVideos;