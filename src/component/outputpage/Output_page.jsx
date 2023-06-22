import React, { useState } from 'react';
import './Output_page.scss';
import { useEffect } from 'react';
import DataContext from '../Context/context';



const Output_page = () => {

  const {inputImportedData} = React.useContext(DataContext);

  const[isOuputRecieved, setIsOutputReceived] = useState(false);

  useEffect(() => {
    if (inputImportedData) {
      setIsOutputReceived(true);
      console.log(inputImportedData);
    }
  }, [inputImportedData]);

  return (
    <>
      <div className="output-page">
        <div className="output-container">
          {isOuputRecieved ? 
            <ul>
              {inputImportedData.map((inputImportedData, index)=>(
                <li key={index}>
                  <div className="Card-Layout">
                    <div className="Card-Layout-body">
                      <div className="card-body">
                        <div className="card">
                          <div className="card-details">
                            <h4 className="mb-4">{inputImportedData.Car_Name}</h4>
                            <span className="first-row">
                              <h2>Car Model:</h2>
                              <h5>{inputImportedData.Car_Modal}</h5>
                            </span>
                            <span className="first-row ">
                              <h2>Purchase Year: </h2>
                              <h5 className="mb-1" > {inputImportedData.Purchase_Year}</h5>
                            </span>
                            <span className="first-row">
                              <h2>Transmission: </h2>
                              <h5 className="mb-1" >{inputImportedData.Transmission}</h5>
                            </span>
                            <span className="first-row">
                              <h2>Fuel Type: </h2>
                              <h5>{inputImportedData.Fuel_Type}</h5> 
                            </span>
                          </div>
                          <div className="img-wrap">
                              <img key={index} src={inputImportedData.Car_Image} alt="CAR IMG" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}   
            </ul>   
            : 
          <div>there is nothing</div> }   
        </div>
      </div> 
    </>
  )
}

export default Output_page
