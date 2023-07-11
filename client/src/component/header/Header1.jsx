import "./Header.scss";
import { useNavigate } from 'react-router-dom';
import {AiOutlineMenu} from 'react-icons/ai';
import {TbMenuOrder} from 'react-icons/tb';
// import {TiSocialLinkedinCircular} from 'react-icons/ti';
// import {GiPulleyHook} from 'react-icons/gi';
import {MdOutlineHome} from 'react-icons/md'
import {HiOutlineClipboardList} from 'react-icons/hi'
import {BsGrid} from 'react-icons/bs'

// import {DiGithub} from 'react-icons/di';
// import {TiSocialTwitterCircular} from 'react-icons/ti';
import { useState } from "react";




const Header = () => {

    const navigate = useNavigate();

// const NavigateToInputForm =()=>{
//   navigate('/InputScreen');
// }

  const [activePage, setActivePage] = useState(1);
//   const [mode, setMode] = useState("Dark");
  const [activeNav, setActiveNav] = useState(false);

//   const handleLIghtMode = ()=>{
//     setMode("Light");
//   };
//   const handleDarkMode = ()=>{
//     setMode("Dark");
//   }

  const handleNavigateToInputForm = ()=> {
    navigate(`/`);
    setActivePage(1);
};

 const handleNavigateToListView = () =>{
    navigate(`/ListView`);
    setActivePage(2);
 };

 const handleNavigateToGridView = () =>{
    navigate(`/OutputPage`);
    setActivePage(3);
 };

 const openNavBar = () =>{
    setActiveNav(true);
 };

 const closeNavBar = () =>{
    setActiveNav(false);
 }

    return  (
      <>
        <header className=' main-header h-16 w-screen bg-black drop-shadow-lg z-10 overflow-hidden md:h-18 md:w-screen' > 
            <div className=" content-header relative h-full  flex items-center mb-0 ml-auto mr-auto justify-between w-11/12">
                <div className=" left  items-center flex gap-4">
                    <span className=' menu-btn absolute md:relative right-0 rounded-full w-7 h-7 justify-center items-center flex cursor-pointer text-gray-300 active:text-white active:bg-gray-700 hover:bg-gray-700 hover:text-white md:text-lg md:w-9 md:h-9' onClick={activeNav === true ? closeNavBar : openNavBar}>{activeNav === true ?  <TbMenuOrder/>  : <AiOutlineMenu/>} </span>
                    <div className="logo text-sm uppercase cursor-pointer text-gray-300 font-bold tracking-widest md:text-lg active:text-white md:font-semibold" onClick={handleNavigateToInputForm} >Entry Form</div>
                </div>
                <div className=" menu-items flex items-center w-40 h-6 md:w-96">
                    <ul className='flex gap-3 cursor-pointer uppercase text-gray-300 md:text-xs md:w-96 md:tracking-widest'>



                        <li className={activePage === 1 ? "hightedList hidden md:flex  flex-col text-white active:text-green-400 group " :  "normalList hidden md:flex flex-col group hover:text-white active:text-green-400"} onClick={handleNavigateToInputForm}>
                            Input Form
                        <span className={activePage === 1 ? " hidden md:inline-block content-none  h-[0.5px] mt-1 bg-orange-300 w-auto" : " hidden  md:inline-block  content-none h-[0.5px]  mt-1 bg-orange-300 w-0 transition-width duration-500 ease-in-out group-hover:w-full hover:opacity-100"}></span></li>
                        
                        <li className={activeNav === true ? "hightedList  text-lg md:hidden justify-center items-center flex animate-slide-in active:text-white active:bg-green-700 hover:bg-gray-700 hover:text-white rounded-full w-7 h-7  " : " md:hidden animate-slide-out" } onClick={handleNavigateToInputForm}><MdOutlineHome/></li>



                        <li className={activePage === 2 ? "hightedList hidden md:flex  flex-col text-white active:text-green-400 group " :  "normalList hidden md:flex flex-col group hover:text-white active:text-green-400"}onClick={handleNavigateToListView}>
                            List View
                        <span className={activePage === 2 ? " hidden md:inline-block content-none  text-green-600 h-[0.5px] mt-1 bg-orange-300 w-auto hover:bg-red-900" : " hidden  md:inline-block  content-none h-[0.5px]  mt-1 bg-orange-300 w-0 transition-width duration-500 ease-in-out group-hover:w-full hover:opacity-100"} ></span></li>

                        <li className= {activeNav === true ? "hightedList  text-md md:hidden justify-center items-center flex animate-slide-in  active:text-white active:bg-green-700 hover:bg-gray-700 hover:text-white rounded-full w-7 h-7  " : "md:hidden animate-slide-out" } onClick={handleNavigateToListView}><HiOutlineClipboardList/><span></span></li>

                        <li className={activePage === 3 ? "hightedList hidden md:flex  flex-col text-white active:text-green-400 group " :  "normalList hidden md:flex flex-col group hover:text-white active:text-green-400"}onClick={handleNavigateToGridView}>
                            Grid View
                        <span className={activePage === 3 ? "hidden md:inline-block content-none  text-green-600 h-[0.5px] mt-1 bg-orange-300 w-auto hover:bg-red-900" : " hidden  md:inline-block  content-none h-[0.5px]  mt-1 bg-orange-300 w-0 transition-width duration-500 ease-in-out group-hover:w-full hover:opacity-100"} ></span></li>

                        <li className={activeNav === true ? "hightedList  text-sm md:hidden justify-center items-center flex animate-slide-in active:text-white active:bg-green-700 hover:bg-gray-700 hover:text-white rounded-full w-7 h-7 " : "md:hidden animate-slide-out"} onClick={handleNavigateToGridView}><BsGrid/><span></span></li>
                    </ul>
                </div>
            </div>
        </header>
        {/* <nav className="left-navbar">
            <div className="navbar-content">
                <ul>
                    <li>
                        <span className="icon"><TiSocialLinkedinCircular/></span>
                        <a href="https://www.linkedin.com" target="blank">Linkdin <span></span></a></li>
                    <li><span  className="icon" ><DiGithub/></span><a href="https://github.com/" target="blank">Github<span></span></a></li>
                    <li><span className="icon"><TiSocialTwitterCircular/></span><a href="https://twitter.com" target="blank">Twitter<span></span></a></li>
                    <li><div className="mode" onClick={mode === "Dark" ? handleLIghtMode : mode === "Light" ? handleDarkMode : ""}>{mode === "Dark" ? <><span className="mode-btn">Light</span><span className="icon-btn1 "><GiPulleyHook/></span></> : mode === "Light" ? <><span className="icon-btn2 "><GiPulleyHook/></span><span className="mode-btn">Dark</span></> : ""}</div></li>
                </ul>
            </div>
        </nav> */}
        {/* <nav className="right-navbar">
            <div className="navbar-content">
                <ul>
                    <li>
                        <span className="icon"><TiSocialLinkedinCircular/></span><span>Linkdin</span></li>
                    <li><span  className="icon" ><DiGithub/></span><span>Github</span></li>
                    <li><span className="icon" ><TiSocialTwitterCircular/></span><span>Twitter</span></li>
                    <li><span><button>LIght</button></span></li>
                </ul>
            </div>
        </nav>
        <footer className='main-footer'> 
        </footer> */}
        </>
    );
};

export default Header;
