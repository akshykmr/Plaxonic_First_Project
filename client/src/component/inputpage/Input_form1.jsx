import React, { useEffect } from 'react';
// import Compressor from 'compressorjs';
import randomAutoFillData from './randomInputData/autoFillData';
// import axios from 'axios';
 
const InputSection = ({ index, handleOnChange, titles, placeholders, formData }) => {

  const name =
      index === 0
    ? "Car_Name"
    : index === 1
    ? "Car_Modal"
    : index === 2
    ? "Purchase_Year"
    : index === 3
    ? "Transmission"
    : index === 4
    ? "Fuel_Type"
    : undefined;

  const value =
  index === 0
   ? formData.Car_Name
   : index === 1
   ? formData.Car_Modal
   : index === 2
   ? formData.Purchase_Year
   : index === 3
   ? formData.Transmission
   : index === 4
   ? formData.Fuel_Type
   : undefined;

   const type = index === 2 ? "number" : "text";

  return (
    <div className="input-group input-group-sm mb-4 mt-2 ">
      <span className="input-group-text w-24 mr-3">{titles[index]}</span>
      <input
        onChange={handleOnChange}
        value={value}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholders[index]}
        aria-describedby="addon-wrapping"
        required 
        onKeyPress={(event) => index === 2 ? (!/[0-9]/.test(event.key) && event.preventDefault()) : null}
      />
    </div>
  );
};



const Input_form = () => {

  const dbURL = 'http://localhost:5000/entries';

    const titles = {
      0: "Car Name",
      1: "Car Modal",
      2: "Purchase Year",
      3: "Transmission",
      4: "Fuel Type"
    };
    
    const placeholders = {
      0: "Enter Your car Name",
      1: "Enter Your car Model",
      2: "Enter the Purchase date",
      3: "Enter the Transmission Type",
      4: "Enter Fuel Type"
    };
    
    const [formData, setformData] = React.useState({ // to store the input text
        Car_Name : "",                 
        Car_Modal : "",              
        Purchase_Year : "",           
        Transmission : "",          
        Fuel_Type : "", 
        Car_Image : [],
    });  

    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [message, setMessage] = React.useState();
    const fileInputRef = React.useRef(null);



      const handleOnChange = (event)=> {
        const { name, value } = event.target;
          setformData((preValue)=>({ ...formData, [name]: value }));
      }

      const handleFileChange = (event) => {
        //METHOD 1: { =======> FOR SINGLE FILE UPLOAD 
          // const file = event.target.files[0];
          // setformData((prevData) => ({
          //   ...prevData,
          //   Car_Image: file,
          // }));

          /// METHOD 2 ======> FOR SINGLE FILE UPLOAD
          // setformData({...formData,Car_Image:event.target.files[0]});
          // console.log(event.target.files[0]);

          const files = Array.from(event.target.files);
          // const newList = [...formData.Car_Image];
          if (files.length > 12) {
            alert('You can only choose up to 6 files.');
            return;
          }
          setformData((prevData) => ({
            ...prevData,
            Car_Image: files,
          }));
        };
        // console.log("final formdata",formData.Car_Image);
     
      const SubmitValidation = async (e) => {
          e.preventDefault(); 
          setFormSubmitted(true);
          // console.log('==',formData.Car_Image,'===',formData.Car_Image.name);
          try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('Car_Name', formData.Car_Name);
            formDataToSubmit.append('Car_Modal', formData.Car_Modal);
            formDataToSubmit.append('Purchase_Year', formData.Purchase_Year);
            formDataToSubmit.append('Transmission', formData.Transmission);
            formDataToSubmit.append('Fuel_Type', formData.Fuel_Type);
            for (let i = 0; i < formData.Car_Image.length; i++) {
              formDataToSubmit.append('Car_Image', formData.Car_Image[i]);
            }
            setMessage('Response has been submitted');

            const response = await fetch(dbURL, {
                method: 'POST',
                body: formDataToSubmit,
              }); 

              if (!response.ok) {
                throw new Error('Request failed');
              }
              const result = await response.json();
              console.log(' this is submited Response:', result);
            } catch (error) {
              console.error('Error:', error);
            }
      };

      useEffect(()=>{
        if (formSubmitted) {
          setFormSubmitted(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          };
        setformData({
          Car_Name : "",                 
          Car_Modal : "",              
          Purchase_Year : "",           
          Transmission : "",          
          Fuel_Type : "", 
          Car_Image : [],
        }) 
      }
      },[formSubmitted])


      const autofillData = () => {
        const randomIndex = Math.floor(Math.random() * randomAutoFillData.length);
        const randomData = randomAutoFillData[randomIndex];
        setformData(randomData);
      };

    return (
      <form onSubmit={SubmitValidation}>
        <div className="form-page md:w-full md:h-[calc(100vh-8vh)] md:flex md:justify-around md:items-center md:bg-slate-300  w-94% flex ml-auto mr-auto md:mt-0 mt-8 ">
          <div className="form-container  md:h-90% md:bg-opacity-50 md:bg-gray-400  rounded-3xl md:shadow-lg md:p-8  md:w-35% w-100%   ">
            <div className="form-inputs flex flex-col mt-8 gap-2 mb-6">
              {[...Array(5)].map((_, index) => {
                    return (
                      <InputSection
                        key={index}
                        index={index}
                        handleOnChange={handleOnChange}
                        titles={titles}
                        placeholders={placeholders}
                        formData={formData}
                      />
                    );
              })}
              <div className="input-group-img input-group-sm ml-auto mr-auto mb-4">
                <input className="bg-blue-500 rounded " type="file" accept="image/*" multiple onChange={handleFileChange} required name="Car_Image" ref={fileInputRef}/>
              </div>
              <button  type="submit" className="btn btn-outline-success w-24 ml-auto mr-auto" >Submit</button>
              <input type="button" className="btn btn-outline-primary w-24 ml-auto mr-auto " onClick={autofillData} value="autofill" />

              <span className='message-text mx-auto w-403px justify-center text-center font-medium text-18'>{message}</span>
            </div>
          </div>
        </div>
      </form>
    )
  }
  
  export default Input_form;
  