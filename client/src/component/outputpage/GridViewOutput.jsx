import React, { useState } from 'react';
import './Output_page.scss';
import { useEffect } from 'react';
import {RxCrossCircled} from 'react-icons/rx';
import axios from 'axios';





const Output_page = () => {




  const[isOuputRecieved, setIsOutputReceived] = useState(false);
//   const [message, setMessage] = useState("");
  const[outputData, setOutputData] = useState();
  const [clickAction, setClickAction] = useState(false);


  

    ///// FETCHING DATA FROM BACKEND 
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/entries');
          const receivedData = response.data;
          setOutputData(receivedData);
          console.log("this is imported data", receivedData);
        } catch (error) {
          console.log('Error:', error);
        }
        setIsOutputReceived(true);
      };
      
      useEffect(() => {
        fetchData();
        setClickAction(false);
      }, [clickAction]);
      
      
           const handleRemoveSingleItem = async (index) => {
            setClickAction(true)
          const objectId = outputData[index]._id;

              try {
                const response = await axios.delete(`http://localhost:5000/entries/${objectId}`);
                console.log('Object deleted successfully:', response.data);
                // Handle any further actions after deletion
              } catch (error) {
                console.error('Error deleting object:', error);
                // Handle error cases
              }
          };
  

  return (
    <>
      <div className="output-page">
        <div className="output-container">
          {/* <span className="response-message">{message}</span> */}
          {isOuputRecieved ? 
            <ul>
              {outputData.map((outputData, index)=>(
                <li key={index}>
                  <div className="Card-Layout">
                    <div className="Card-Layout-body">
                      <div className="card-body">
                        <div className="card">
                          <span className="cross-btn" onClick={() => handleRemoveSingleItem(index)}><RxCrossCircled/></span>
                          <div className="card-details">
                            <h4 className="mb-4">{outputData.Car_Name}</h4>
                            <span className="first-row">
                              <h2>Car Model:</h2>
                              <h5>{outputData.Car_Modal}</h5>
                            </span>
                            <span className="first-row ">
                              <h2>Purchase Year: </h2>
                              <h5 className="mb-1" > {outputData.Purchase_Year}</h5>
                            </span>
                            <span className="first-row">
                              <h2>Transmission: </h2>
                              <h5 className="mb-1" >{outputData.Transmission}</h5>
                            </span>
                            <span className="first-row">
                              <h2>Fuel Type: </h2>
                              <h5>{outputData.Fuel_Type}</h5> 
                            </span>
                          </div>
                          <div className="img-wrap">
                              <img key={index} src={outputData.Car_Image} alt="CAR IMG" />
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
