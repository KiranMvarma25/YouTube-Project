import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function CorrectUser(props){

    let user = props.data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClickLogOut(){
        dispatch(logout());
        localStorage.removeItem('user');
        navigate('/login');
        window.alert("Logged Out");
    }

    return(
        <>
            <img src={user.img} alt={`Image of ${user.name}`} height="50px" width="50px" />
            <p>{user.name}</p>
            <p>{user.email}</p>

            <Link to={"/getstartedwithvideos"}><h3>Get Started</h3></Link>
            <button onClick={handleClickLogOut}>Log Out</button>
        </>
    );
}


export default CorrectUser;