import { Link } from "react-router-dom";

import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

function SidebarIcons(){

    return(
        <>
            <Link to={"/getstartedwithvideos"}><h3 className="sidebaricons"><IoMdHome /></h3></Link>
            <h3 className="sidebaricons"><SiYoutubeshorts /></h3>
            <h3 className="sidebaricons"><MdOutlineSubscriptions /></h3>
            <h3 className="sidebaricons"><FaHistory /></h3>
        </>
    )
}


export default SidebarIcons;