import React, { useEffect } from 'react';
import './Input_form.scss';
// import Compressor from 'compressorjs';
import randomAutoFillData from './randomInputData/autoFillData';
import axios from 'axios';
 
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
    <div className="input-group input-group-sm mb-4">
      <span className="input-group-text">{titles[index]}</span>
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
    const [responseCount, setResponseCount] = React.useState(0);
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
          setformData((prevData) => ({
            ...prevData,
            Car_Image: files,
          }));
        };
        // console.log("final formdata",formData.Car_Image);


    
      useEffect(() => {
        const fetchResponseCount = async () => {
          try {
            const response = await axios.get(dbURL+'/count');
            setResponseCount(response.data.count);
          } catch (error) {
            console.error('Error fetching response count:', error);
          }
        };
    
        fetchResponseCount();
      }, []);
      
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
            setResponseCount((prevCount) => prevCount + 1);
            setMessage(`${responseCount + 1} response${responseCount === 0 ? '' : 's'} ${responseCount === 0 ? 'has' : 'have'} been submitted.`);

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
        <div className="form-page">
          <div className="form-container">
            <div className="form-inputs">
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
              <div className="input-group-img input-group-sm  mb-4">
                <input type="file" accept="image/*" multiple onChange={handleFileChange} required name="Car_Image" ref={fileInputRef}/>
              </div>
              <button  type="submit" className="btn btn-outline-success" >Submit</button>
              <input type="button" className="btn btn-outline-primary" onClick={autofillData} value="autofill" />

              <span className='message-text'>{message}</span>
            </div>
          </div>
        </div>
      </form>
    )
  }
  
  export default Input_form;
  