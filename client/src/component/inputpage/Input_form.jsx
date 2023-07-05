import React,{useEffect, useState } from 'react';
import './Input_form.scss';
// import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/context';
import randomAutoFillData from './randomInputData/autoFillData';

 
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

  const {getInputData} = React.useContext(DataContext);

  // const navigate = useNavigate();

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
        Car_Image : "",
    });  

    const [formDataArray, setFromDataArray] = React.useState([]);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [message, setMessage] = useState();

    
  // const postData = async (data) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/entries', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Request failed');
  //     }
      
  //     const result = await response.json();
  //     console.log('Response:', result);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };


      
    
      // const NavigateToInputForm =()=>{ // this will automatically navigated to outputpage
      //   navigate(`/OutputPage`)
      // };

      const handleOnChange = (event)=> {
        const { name, value } = event.target;
          setformData((preValue)=>({ ...formData, [name]: value }));
      }



      // useEffect(()=>{
      //   console.log("222",formData);
      // },[formData]);
  
      const handleFileChange = (event) => {
        const files = event.target.files;
          const reader = new FileReader();
          const file = files[0];
          reader.onload = () => {
            const imageDataURL = reader.result;
          setformData({ ...formData, Car_Image: imageDataURL });
          };
          reader.readAsDataURL(file);
      };
      
      const SubmitValidation = (e) => {
          e.preventDefault(); // prevents the page to reload on submit(as in default page submission it reloads the page)

          // setTimeout(function() {
          //   setMessage("Redirecting to Result page in 3 seconds...");
          // }, 3000);
          // setTimeout(function() {
          // //  NavigateToInputForm();
          // }, 6000);

          setFromDataArray((prevFormDataArray) => ([...prevFormDataArray, formData])
          );
          
          

          setFormSubmitted(true);

          const responseCount = formDataArray.length + 1;
          setMessage(`${responseCount} response${responseCount === 1 ? '' : 's'} ${responseCount === 1 ? 'has' : 'have'} been submitted.`); 
          

         setformData({  Car_Name : "",                
          Car_Modal : "",              
          Purchase_Year : "",           
          Transmission : "",          
          Fuel_Type : "", 
          }); // to clear the input fields in inputbox
      };
      
      
      useEffect(() => {
        if (formSubmitted) {
          getInputData(formDataArray);
            // console.log(formDataArray);
          //  postData(formData);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ formSubmitted]);
     

     
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
                <input type="file" accept="image/*" multiple={false} onChange={handleFileChange} required />
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
  