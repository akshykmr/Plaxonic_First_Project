import React from 'react'

const card = () => {
  return (
    <div>
      <p>the list is :</p>

<ul>
  {cards.map((card, index)=>(
    <li key={index}>{isOuputRecieved ? 
    <div className="output-cards">
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
  </div> 
  : 
  <div>there is nothing</div>} </li>
  ))}
  
</ul>
    </div>
  )
}

export default card
