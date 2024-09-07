import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "../Shared/Navbar"

const MainLayout = () => {
  return (
    <div className="bg-[#F9FAFE]">
       <div className="lg:flex max-w-[1920px] mx-auto">
        <Sidebar/>

       <div className="2xl:p-[30px] lg:p-[15px] md:p-5 2xl:pt-0 lg:pt-0  md:pt-0 pt-0 p-0 w-full">
        <Navbar/>
        <Outlet/>
       </div>
         
    </div>
    </div>
  )
}

export default MainLayout