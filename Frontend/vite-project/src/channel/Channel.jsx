import { useState } from "react";
import { useDispatch } from "react-redux";
import { channel } from "../store/userSlice";

import { toast } from "react-toastify";

function Channel() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);                                                    // Sets the selected video file to the state
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);                                                    // Sets the selected image file to the state
    };

    let count = 0;

    async function handleSubmit(e){
        e.preventDefault();

        count = count + 1;

        if(!title || !desc || !video || !image){                                        // Validates that all required fields are filled
            return window.alert("Please fill all fields and upload both video and image.");
        }

        const formData = new FormData();                                                // Prepares the form data for submission
        formData.append("channelVideoName", title);                                     // Adds all the details into form data
        formData.append("channelVideoDescription", desc);
        formData.append("channelVideoUploader", localStorage.getItem("userId"));
        formData.append("video", video);
        formData.append("image", image);

        try{                                                                            // Function for sending the form data into the database through API
            const response = await fetch("http://localhost:7000/base/uploadVideo", { 
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if(result.success){
                dispatch(channel(result.Channel)); 
                if(count == 1){     // Only once Toast message is shown
                    toast.success("Video Uploaded Successfully");
                    setTimeout(() => {
                        toast.info("Refresh the Page");
                    },1000);
                }
            } 
            else{
                toast.error("Failed to Upload");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="uploadVideoForm">
            <h3 className="signupformLabel">Title</h3>
            <br />
            <input className="signupformInput" placeholder="Mention a Title" type="text" onChange={(e) => setTitle(e.target.value)} />

            <br />
            <br />

            <h3 className="signupformLabel">Description</h3>
            <br />
            <input className="signupformInput" placeholder="Describe about your Video" type="text" onChange={(e) => setDesc(e.target.value)} />

            <br />
            <br />

            <h3 className="signupformLabel">Video</h3>
            <br />
            <input className="signupformInput" type="file" onChange={handleVideoChange} />

            <br />
            <br />

            <h3 className="signupformLabel">Image (Thumbnail)</h3>
            <br />
            <input className="signupformInput" type="file" onChange={handleImageChange} />

            <br />
            <br />

            <button className="signupformButton" type="submit">Upload Video</button>
        </form>
    );
}

export default Channel;
