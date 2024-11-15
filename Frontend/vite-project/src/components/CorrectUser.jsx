import { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Channel from "../channel/Channel";
import ChannelVideos from "../channel/ChannelVideos";

function CorrectUser(props){

    let user = props.data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClickLogOut(){
        dispatch(logout());
        localStorage.removeItem('user');
        window.alert("Logged Out");
        navigate('/signup')
    }

    const userDetails = useSelector(store => store.user.userData);
    console.log("userDetails", userDetails);

    const [toggle, setToggle] = useState(false);
    function handleUploadVideo(){
        setToggle(!toggle);
    }


    return(
        <>

            <div className="userAccount">
                <img src={user.img} alt={`Image of ${user.name}`} height="100px" width="100px" className="userAccountImage" />
                <div className="userAccountChilds">
                    <h3 className="userAccountChild1">{user.name}</h3>
                    <h3>{user.email}</h3>
                </div>
            </div>
            
            <br />
            
            <div>
                
                <button onClick={handleUploadVideo} className="signupformButton">Upload Video</button>
                
                <br />
                <br />

                <ChannelVideos />

                {
                    toggle ? <Channel /> : "" 
                }

                <br />

                <Link to={"/getstartedwithvideos"}><h3>Get Started</h3></Link>
        
                <br />
                <br />

                <button onClick={handleClickLogOut} className="signupformButton">Log Out</button>

            </div>

        </>
    );
}


export default CorrectUser;