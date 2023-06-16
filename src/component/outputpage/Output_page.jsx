import React, { useState } from 'react';
import './Output_page.scss';
import {RiPoliceCarLine} from 'react-icons/ri';
import { useEffect } from 'react';


const Output_page = ({inputImportedData}) => {
  const[isOuputRecieved, setIsOuputRecieved] = useState(false)
 
  // const [inputImportedData, setInputImportedData] = useState(false);

  // const outputExportedData =(inputImportedData)=>{
  //   setInputImportedData(inputImportedData);
  // }

  // useEffect(()=>{
    // console.log("third data " ,outputExportedData);
  // }, [outputExportedData]);
  useEffect(() => {
    if (inputImportedData) {
      console.log('Third page data:', inputImportedData.Car_Name);
      setIsOuputRecieved(true);
    }
  }, [inputImportedData]);

  return (
    <>
        <div className="output-page">
            <div className="output-container">
                {isOuputRecieved ? <div className="output-cards">
                  <div className="card-details">
                    <div className="car_details">
                      <RiPoliceCarLine/>
                      <span className='title'>Car Name:</span>
                      <span>{inputImportedData.Car_Name}</span>
                    </div>
                    <div className="car_details">
                      <RiPoliceCarLine/>
                      <span className='title' >Car Modal:</span>
                      <span>{inputImportedData.Car_Modal}</span>
                    </div>
                    <div className="car_details">
                    <RiPoliceCarLine/>
                    <span className='title' >Purchase Year:</span>
                      <span>{inputImportedData.Purchase_Year}</span>
                    </div>
                    <div className="car_details">
                    <RiPoliceCarLine/>
                    <span className='title' >Transmission:</span>
                      <span>{inputImportedData.Transmission}</span>
                    </div>
                    <div className="car_details">
                      <RiPoliceCarLine/>
                    <span className='title' >Fuel Type:</span>
                      <span>{inputImportedData.Fuel_Type}</span>
                    </div>
                  </div>
                  <div className="car_images">
                    <div className="img-grid">
                      <span>Car Image</span>
                      {/* <img src={CARIMG} alt="" /> */}
                      {/* <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" />
                      <img src={CARIMG} alt="" /> */}

                    </div>
                  </div>
                </div> : <div>there is nothing</div>} 
                 
            </div>
        </div>
    </>
  )
}

export default Output_page
