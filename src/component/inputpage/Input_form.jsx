import React from 'react'
import { useState,useEffect } from 'react'
import './Input_form.scss'




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

  return (
    <div className="input-group input-group-sm mb-4">
      <span className="input-group-text">{titles[index]}</span>
      <input
        onChange={handleOnChange}
        value={value}
        name={name}
        type="text"
        className="form-control"
        placeholder={placeholders[index]}
        aria-describedby="addon-wrapping"
        required
      />
    </div>
  );
};



const Input_form = (props) => {

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
    
    
    const [formData, setformData] = useState({
        Car_Name : "",                
        Car_Modal : "",              
        Purchase_Year : "",           
        Transmission : "",          
        Fuel_Type : "", 
    });  // to store the input text
    const [result, setResult] = useState(false); // to store the input text and image in a array 
    const [imageList, setImageList] = useState([]); // to store the image only
    const [message, setMessage] = useState()
      

      const handleOnChange = (event)=> {
        const { name, value } = event.target;
          setformData({ ...formData, [name]: value });
      }
  

      const handleFileChange = (event) => {
        const files = event.target.files;
        const newList = [...imageList];
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          const file = files[i];
          // const imageObj = {
          //   name: file.name,
          //   type: file.type,
          //   size: file.size,
          // };
          reader.onload = () => {
            const imageDataURL = reader.result;
            newList.push(imageDataURL);
            setImageList(newList);
          };
          reader.readAsDataURL(file);
        }
      };
      

      const SubmitValidation = (e) => {
          e.preventDefault(); // prevents the page to reload on submit(as in default page submission it reloads the page)
          setformData({  Car_Name : "",                
          Car_Modal : "",              
          Purchase_Year : "",           
          Transmission : "",          
          Fuel_Type : "",  }); // to clear the input fields in input area/box
          setResult({...formData}); // creates the copy with key value pairs of formData object
          setMessage("Your response has been submitted")   
         
      };
      useEffect(() => {
        props.getInputData(result);
          // console.log("this is result" ,formData)
      },[result]);

      const handleClear = () => {
        setformData({});
        setImageList([]);
        setResult(false);
      };
  
      const autofillData=()=>{
        setformData({  Car_Name : "Toyota",                
          Car_Modal : "V4",              
          Purchase_Year : "2022",           
          Transmission : "auto",          
          Fuel_Type : "petrol", 
        });
      };


    const resultt = JSON.stringify(formData);



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
                      <div className="input-group input-group-sm  mb-4">
                       <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
                  </div>
                  <button  type="submit" className="btn btn-success" >Submit</button>
              <button type="button" onClick={handleClear}className="btn btn-outline-danger" >Clear</button>
              <span className='message-text'>{message}</span>
                  </div>

                      







                  
              
              
              <div className="result"  style={{
                  margin:"0 auto",
                  display:'flex',
                  flexDirection:"column",
                 }}>
                 Output :  { result ? resultt : "not found"}
              </div>  
              <button onClick={autofillData}>autofill</button>
              </div>
            </div>
      </form>
    )
  }
  
  export default Input_form;
  