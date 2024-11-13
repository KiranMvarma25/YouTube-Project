import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <>
            <Link to={"/getstartedwithvideos"}><h3>Home</h3></Link>
            <h3>Shorts</h3>
            <h3>Subscriptions</h3>
            <h3>History</h3>
        </>
    )
}


export default Sidebar;