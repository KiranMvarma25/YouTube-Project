import { MdOutlineStorage } from "react-icons/md";
import { ImYoutube } from "react-icons/im";
import { ImSearch } from "react-icons/im";
import { IoPerson } from "react-icons/io5";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import SidebarIcons from "./components/SidebarIcons";

import { useSelector } from "react-redux";
import { useEffect } from "react";

function App(){
  
  const [toggle, setToggle] = useState(false);

  function handleClick(){
    setToggle(!toggle);
    console.log(toggle)
  }

  const userImg = useSelector(state => state.user.userData);
  const userStatus = useSelector(state => state.user.userStatus);

  useEffect(() => {
    if(userImg){
      console.log("User data loaded after refresh");
    } 
    else{
      console.log("No user data found");
    }
  }, [userImg]);

  console.log("userImg",userImg);
  console.log("userStatus",userStatus);

  return (
    <>
      <div className="sidebarParent">

          <button className="sidebarChild1" onClick={handleClick}><MdOutlineStorage /></button>
          <h2 className="sidebarChild2"><ImYoutube />YouTube</h2>
          
          <div className="sidebarSubChild1"> 
            <input className="sidebarChild3" type="text" placeholder="   Search" />
            <button className="sidebarChild4"><ImSearch /></button>
          </div>
          
          <div className="userSidebar">
            { userStatus ? 
                userImg ? (
                            <Link to={"/loginuseraccount"}><img className="sidebarChild5" src={userImg.img} alt="User" /><p>{userImg.name}</p></Link>  
                          ) : ( 
                            <Link to={"/signup"}><IoPerson />Sign in</Link>
                          ) : (
                            <Link to={"/signup"}><IoPerson />Sign in</Link>
                          )
            }  
          </div>

      </div>

      <div className="togglebar">

        <div className="togglebar1">
          {!toggle ? <Sidebar /> : <SidebarIcons /> }
        </div>
        
        <div className="togglebar2">
          <Outlet />
        </div>
        
      </div>
    </>
  )
}


export default App;