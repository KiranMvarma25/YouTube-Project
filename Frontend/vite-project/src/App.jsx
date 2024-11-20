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

import { useDispatch } from "react-redux";
import { SearchFilteredVideos } from "./store/userSlice";

function App(){
  
  const [toggle, setToggle] = useState(false);                        // For Hamburger Side Menu

  const [search, setSearch] = useState("");
  const [filteredVideo, setFilteredVideo] = useState([]);             // Fetching All the Data
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const dispatch = useDispatch();

  function handleClick(){
    setToggle(!toggle);                                               // Function performs Toggling of Menu
    // console.log(toggle)
  }

  const userImg = useSelector(state => state.user.userData);          // Fetching all data of Loggedin User
  const userStatus = useSelector(state => state.user.userStatus);     // Knowing the Status of USer

  // useEffect(() => {
  //   if(userImg){
  //     console.log("User data loaded after refresh");
  //   } 
  //   else{
  //     console.log("No user data found");
  //   }
  // }, [userImg]);



  // console.log("userImg",userImg);
  // console.log("userStatus",userStatus);

  const data = useSelector(state => state.user.allVideos || []);      // Used to fetched all the videos
  // console.log("Filter data",data);

  useEffect(() => {
    if (!isSearchPerformed) {
      setFilteredVideo(data);
    }
  }, [data, isSearchPerformed]);                                      // If search is performed only searched video is displayed

  function handleSearch(e) {
    const search = e.target.value.toLowerCase();
    setSearch(search);
    // console.log("Search", search);
  }

  function handleSearchClick() {                                      // Function for searching the video by title
    const filtered = data.filter(video =>
      video.channelVideoName.toLowerCase().includes(search)
    );
    setFilteredVideo(filtered);
    dispatch(SearchFilteredVideos(filtered));
    setIsSearchPerformed(true); 
    // console.log("filtered", filtered);
  }

  const handleShowAllVideos = () => {
    setSearch(""); 
    dispatch(SearchFilteredVideos(data)); 
  }

  return (
    <>
      <div className="sidebarParent">

          <button className="sidebarChild1" onClick={handleClick}><MdOutlineStorage /></button>
          <h2 className="sidebarChild2"><ImYoutube /></h2>
          <h1 className="youtubeheading">YouTube</h1>
          
          <div className="sidebarSubChild1"> 
            <input className="sidebarChild3" type="text" placeholder=" Search" onChange={handleSearch} />
            <button className="sidebarChild4" onClick={handleSearchClick}><ImSearch /></button>
          </div>
          
          <div className="userSidebar">   {/* After logging into account User Name is Displayed */}
            { userStatus ? 
                userImg ? (
                            <Link className="Router-Link" to={"/loginuseraccount"}><img className="sidebarChild5" src={userImg.img} alt="User" /><p className="noneformobile">{userImg.name}</p></Link>  
                          ) : ( 
                            <Link className="Router-Link" to={"/signup"}><IoPerson />Sign in</Link>
                          ) : (
                            <Link className="Router-Link" to={"/signup"}><IoPerson />Sign in</Link>
                          )
            }  
          </div>

      </div>

      <div className="togglebar">
        
        <div className="togglebar1">                
          {!toggle ? <Sidebar ShowAllVideos={handleShowAllVideos} /> : <SidebarIcons /> }   {/* toggle responsible for sidebar hamburger menu */}
        </div>  
        
        <div className="togglebar2">                
          <Outlet />                                {/* All Children Components will be displayed here */}
        </div>
        {/* <Outlet /> */}
      </div>
      {/* <Outlet /> */}
    </>
  )
}


export default App;