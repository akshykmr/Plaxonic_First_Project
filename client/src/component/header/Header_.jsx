import "./Header.scss";
import { useNavigate } from 'react-router-dom';
import {AiOutlineMenu} from 'react-icons/ai';
import {TbMenuOrder} from 'react-icons/tb';
import {TiSocialLinkedinCircular} from 'react-icons/ti';
import {GiPulleyHook} from 'react-icons/gi';

import {DiGithub} from 'react-icons/di';
import {TiSocialTwitterCircular} from 'react-icons/ti';
import { useState } from "react";




const Header = () => {

    const navigate = useNavigate();

// const NavigateToInputForm =()=>{
//   navigate('/InputScreen');
// }

  const [activePage, setActivePage] = useState(1);
  const [mode, setMode] = useState("Dark");

  const handleLIghtMode = ()=>{
    setMode("Light");
  };
  const handleDarkMode = ()=>{
    setMode("Dark");
  }

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
    setActivePage(4);
 };

 const closeNavBar = () =>{
    setActivePage(1);
 }

    return  (
      <>
        <header className='main-header'> 
            <div className="header-content">
                <div className=" left"><span onClick={activePage === 4 ? closeNavBar : openNavBar}>{activePage === 4 ? <TbMenuOrder/> : <AiOutlineMenu/>}</span><div className="logo" onClick={handleNavigateToInputForm} >Entry Form</div>
                </div>
                <div className="right">
                    <ul>
                        <li className={activePage === 1 ? "hightedList" : "normalList"} onClick={handleNavigateToInputForm}>Input Form<span></span></li>
                        <li className={activePage === 2 ? "hightedList" : "normalList"}onClick={handleNavigateToListView}>List View<span></span></li>
                        <li className={activePage === 3 ? "hightedList" : "normalList"}onClick={handleNavigateToGridView}>Grid View<span></span></li>
                    </ul>
                </div>
            </div>
        </header>
        <nav className="left-navbar">
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
        </nav>
        <nav className="right-navbar">
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
        </footer>
        </>
    );
};

export default Header;
