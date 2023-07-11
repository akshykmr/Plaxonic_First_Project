import React from 'react';
import { useState, useEffect } from 'react';
import './Input_form2.scss';
import banner from '../../assets/port/Background1.jpg';
import bannerPhoto from '../../assets/port/gallary.png';
import bannerText from '../../assets/port/N2.png';
import bannerButton1 from '../../assets/port/ball1.png';
import bannerButton2 from '../../assets/port/ball 2.png';
import bannerButton3 from '../../assets/port/ball 3 big.png';
import bannerTree1 from '../../assets/port/small leaf.png';
import bannerTree2 from '../../assets/port/medium leaf.png';
import bannerTree3 from '../../assets/port/long leaf.png';
import bannerClock from '../../assets/port/clock pin small.png';
import bannerClock2 from '../../assets/port/clock pin.png';

const Input_form2 = () => {

	const [treeClass, setTreeClass] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setTreeClass('An');
    }, 2000);
  }, []);
  return (
    <>
    <div className="body">
        <div class="bannerBkg">
            <div class="banner">
	            <img src={banner} alt=""/>
            </div>
	        <div class="bannerPhoto">
	            <img src={bannerPhoto} alt=""/>
	        </div>
	        <div class="bannerText">
                <img src={bannerText} alt=""/>
	        </div>
	        <div class="bannerButton1">
                <img src={bannerButton1} alt=""/>
	        </div>
	        <div class="bannerButton2">
                <img src={bannerButton2} alt=""/>
	        </div>
	        <div class="bannerButton3">
                <img src={bannerButton3} alt=""/>
	        </div>
			<div className={`bannerTree1 ${treeClass}`}>
        <img src={bannerTree1} alt="" />
      </div>
      <div className={`bannerTree2 ${treeClass}`}>
        <img src={bannerTree2} alt="" />
      </div>
      <div className={`bannerTree3 ${treeClass}`}>
        <img src={bannerTree3} alt="" />
      </div>
	        <div class="bannerClock">
                <img src={bannerClock} alt=""/>
	        </div>
	        <div class="bannerClock2">
                <img src={bannerClock2} alt=""/>
	        </div>
    </div>	
    <div className="2nd-block"></div>
    </div>
    </>
  )
}

export default Input_form2
