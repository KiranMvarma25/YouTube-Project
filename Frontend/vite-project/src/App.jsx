import { MdOutlineStorage } from "react-icons/md";
import { ImYoutube } from "react-icons/im";
import { ImSearch } from "react-icons/im";
import { IoPerson } from "react-icons/io5";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import SidebarIcons from "./components/SidebarIcons";

function App(){
  
  const [toggle, setToggle] = useState(false);

  function handleClick(){
    setToggle(!toggle);
    console.log(toggle)
  }

  return (
    <>
      <div className="sidebarParent">

          <button className="sidebarChild1" onClick={handleClick}><MdOutlineStorage /></button>
          <h2 className="sidebarChild2"><ImYoutube />YouTube</h2>
          
          <div className="sidebarSubChild1"> 
            <input className="sidebarChild3" type="text" placeholder="   Search" />
            <button className="sidebarChild4"><ImSearch /></button>
          </div>
          
          <Link to={"/signup"}><h3 className="sidebarChild5"><IoPerson /></h3></Link>

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