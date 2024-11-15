import { useState } from "react";
import { useDispatch } from "react-redux";
import { channel } from "../store/userSlice";

function Channel() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    async function handleSubmit(e){
        e.preventDefault();

        if(!title || !desc || !video || !image){
            return window.alert("Please fill all fields and upload both video and image.");
        }

        const formData = new FormData();
        formData.append("channelVideoName", title);
        formData.append("channelVideoDescription", desc);
        formData.append("channelVideoUploader", localStorage.getItem("userId"));
        formData.append("video", video);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:7000/base/uploadVideo", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                dispatch(channel(result.Channel)); 
            } else {
                window.alert("Failed to Upload");
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Title</h3>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />

            <h3>Description</h3>
            <input type="text" onChange={(e) => setDesc(e.target.value)} />

            <h3>Video</h3>
            <input type="file" onChange={handleVideoChange} />

            <h3>Image (Thumbnail)</h3>
            <input type="file" onChange={handleImageChange} />

            <button type="submit">Upload Video</button>
        </form>
    );
}

export default Channel;
