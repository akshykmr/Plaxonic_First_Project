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
          {isOuputRecieved ? 
            <ul>
              {cards.map((card, index)=>(
                <li key={index}>
                  <div class="Card-Layout">
                    <div class="Card-Layout-body">
                      <div class="card-body">
                        <div class="card">
                          <div className="card-details">
                            <h4 class="mb-4">{card.Car_Name}</h4>
                            <span className="first-row">
                              <h2>Car Model:</h2>
                              <h5>{card.Car_Modal}</h5>
                            </span>
                            <span className="first-row ">
                              <h2>Purchase Year: </h2>
                              <h5 class="mb-1" > {card.Purchase_Year}</h5>
                            </span>
                            <span className="first-row">
                              <h2>Transmission: </h2>
                              <h5 class="mb-1" >{card.Transmission}</h5>
                            </span>
                            <span className="first-row">
                              <h2>Fuel Type: </h2>
                              <h5>{card.Fuel_Type}</h5> 
                            </span>
                          </div>
                          <div class="img-wrap">
                            {card.imageList.map((imageUrl, index) => (
                              <img key={index} src={imageUrl} alt="CAR IMG" />
                            ))}
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
