import { MdOutlineStorage } from "react-icons/md";
import { ImYoutube } from "react-icons/im";
import { ImSearch } from "react-icons/im";
import { IoPerson } from "react-icons/io5";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App(){
  return (
    <>
      <button><MdOutlineStorage /></button>
      <h2><ImYoutube />YouTube</h2>
      <input type="text" placeholder="Search" />
      <h3><ImSearch /></h3>
      <Link to={"/signup"}><h3><IoPerson /></h3></Link>
      <Outlet />
    </>
  )
}


export default App;