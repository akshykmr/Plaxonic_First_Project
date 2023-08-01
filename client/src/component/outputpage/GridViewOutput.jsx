import React, { useState } from 'react';
import './Output_page.scss';
import { useEffect } from 'react';
import {RxCrossCircled} from 'react-icons/rx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DataContext from "../Context/context";





const Output_page = () => {

  const navigate = useNavigate();
  const { getInputData } = React.useContext(DataContext);


  const[isOuputRecieved, setIsOutputReceived] = useState(false);
//   const [message, setMessage] = useState("");
  const[outputData, setOutputData] = useState();
  const [clickAction, setClickAction] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);



  

    ///// FETCHING DATA FROM BACKEND 
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/entries');
          const receivedData = response.data;
          setOutputData(receivedData);
          console.log("this is imported data", receivedData);
          const thumbnailsArray = receivedData.map((data) => {
            for (let i = 0; i < data.Car_Image.length; i++) {
              if (data.Car_Image[i].imgUrl !== "result.url") {
                return data.Car_Image[i].imgUrl;
              }
            }
            return null; // If no valid image URL is found for an item
          });
    
          setThumbnails(thumbnailsArray);
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
        setClickAction(true);
        const confirmDel = window.confirm(
          "Are you sure you want to delete the selected items?"
        );
        // console.log("this is selected object", outputData[index]._id);
        const objectData = {
          objectId: outputData[index]._id,
          objectImageDetails: outputData[index].Car_Image,
        };
        if (confirmDel) {
          try {
            const response = await axios.delete(
              `http://localhost:5000/entries/${objectData.objectId}`,
              {
                data: objectData,
              }
            );
            console.log("Object deleted successfully:", response.data);
            // Handle any further actions after deletion
          } catch (error) {
            console.error("Error deleting object:", error);
            // Handle error cases
          }
        }
        console.log("this is object data for delete", objectData);
      };

          const handleOpenItem = (index) => {
            navigate(`/SingleView`);
            // console.log("index of clicked item ", index,outputData[index]);
            getInputData(outputData[index]._id);
          };
  

  return (
    <>
      <div className="output-page">
        <div className="output-container">
          {/* <span className="response-message">{message}</span> */}
          {isOuputRecieved ? 
            <ul>
              {outputData.map((outputData, index)=>(
                <li className=' cursor-pointer'>
                  <div className="Card-Layout">
                    <div className="Card-Layout-body">
                      <div className="card-body">
                        <div className="card">
                          <span className="cross-btn" onClick={() => handleRemoveSingleItem(index)}><RxCrossCircled/></span>
                          <div onClick={() => handleOpenItem(index)} key={index} className="card-details">
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
                          <div onClick={() => handleOpenItem(index)} key={index} className="img-wrap">
                          {thumbnails[index] ? (
                            <img src={thumbnails[index]} alt="" />
                          ) : (
                            <div>No Image</div>
                          )}
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
