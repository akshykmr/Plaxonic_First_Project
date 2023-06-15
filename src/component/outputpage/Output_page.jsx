import React from 'react';
import './Output_page.scss';
import {RiPoliceCarLine} from 'react-icons/ri';


const Output_page = ({CARIMG}) => {
  return (
    <>
        <div className="output-page">
            <div className="output-container">
                <div className="output-cards">
                  <div className="card-details">
                    <div className="car_details">
                      <RiPoliceCarLine/>
                      <span className='title'>Car Name:</span>
                      <span>Toyota</span>
                    </div>
                    <div className="car_details">
                      <RiPoliceCarLine/>
                      <span className='title' >Car Modal:</span>
                      <span>Toyota</span>
                    </div>
                    <div className="car_details">
                    <RiPoliceCarLine/>
                    <span className='title' >Car Name:</span>
                      <span>Toyota</span>
                    </div>
                    <div className="car_details">
                    <RiPoliceCarLine/>
                    <span className='title' >Car Name:</span>
                      <span>Toyota</span>
                    </div>
                    <div className="car_details">
                      <RiPoliceCarLine/>
                    <span className='title' >Car Name:</span>
                      <span>Toyota</span>
                    </div>
                  </div>
                  <div className="car_images">
                    <div className="img-grid">
                      <span>Car Image</span>
                      <img src={CARIMG} alt="" />
                      {/* <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" /> */}

                    </div>
                  </div>
                </div>   
                 
            </div>
        </div>
    </>
  )
}

export default Output_page
