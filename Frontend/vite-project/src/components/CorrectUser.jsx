import { Link } from "react-router-dom";

function CorrectUser(props){

    let user = props.data;

    return(
        <>
            <img src={user.img} alt={`Image of ${user.name}`} height="50px" width="50px" />
            <p>{user.name}</p>
            <p>{user.email}</p>

            <Link to={"/getstartedwithvideos"}><h3>Get Started</h3></Link>
        </>
    );
}


export default CorrectUser;