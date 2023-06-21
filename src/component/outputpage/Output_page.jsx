import React, { useState } from 'react';
import './Output_page.scss';
// import IMG from '../../assets/25571.jpg'
// import './card.css'
// import {RiPoliceCarLine} from 'react-icons/ri';
import { useEffect } from 'react';


const Output_page = ({inputImportedData}) => {

  const[isOuputRecieved, setIsOuputRecieved] = useState(true);
  const [cards, setCards] = useState([]);
  const { imageList } = inputImportedData;


  useEffect(() => {
    if (inputImportedData) {
      // console.log('Third page data:', inputImportedData.Car_Name);
      setCards(prevCards => [...prevCards, inputImportedData])
      setIsOuputRecieved(true);
    }
  }, [inputImportedData]);

  return (
    <>
   

        <div className="output-page">
            <div className="output-container">
            <ul>
  {cards.map((card, index)=>(
    <li key={index}>{isOuputRecieved ? 
            <div class="Card-Layout">
        <div class="Card-Layout-body">
            <div class="card-body">
                <div class="card">
                  <div className="card-details">
                    <h4 class="mb-4">{inputImportedData.Car_Name}</h4>
                    <span className="first-row">
                      <h2>Car Model:</h2>
                    <h5>{inputImportedData.Car_Modal}</h5>
                    </span>
                    <span className="first-row ">
                    <h2>Purchase Year: </h2>
                    <h5 class="mb-1" > {inputImportedData.Purchase_Year}</h5>
                    </span>
                    <span className="first-row">
                    <h2>Transmission: </h2>
                    <h5 class="mb-1" >{inputImportedData.Transmission}</h5>
                    </span>
                    <span className="first-row">
                    <h2>Fuel Type: </h2>
                    <h5>{inputImportedData.Fuel_Type}</h5> 
                    </span>
                    </div>
                    <div class="img-wrap">
                    {imageList.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
                  </div>
              </div>
             
          </div>
      </div>
  </div>
  
  
           : 
           <div>there is nothing</div>} </li>
           ))} 
           
         </ul>        
            </div>
        </div>
       
    </>
  )
}

export default Output_page
