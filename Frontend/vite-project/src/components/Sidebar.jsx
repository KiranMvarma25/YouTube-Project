import { Link } from "react-router-dom";

function Sidebar(props){

    let ShowAllVideos = props.ShowAllVideos;

    return(
        <>
            <Link to={"/getstartedwithvideos"} onClick={ShowAllVideos} ><h3 className="sidebarChildren">Home</h3></Link>
            <h3 className="sidebarChildren">Shorts</h3>
            <h3 className="sidebarChildren">Subscriptions</h3>
            <h3 className="sidebarChildren">History</h3>
        </>
    )
}


export default Sidebar;