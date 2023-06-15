import React from 'react'
import { useState } from 'react'
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




  const Input_form = () => {


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
      }); 
      const [result, setResult] = useState(false,[]);
      const [imageList, setImageList] = useState([]);
      const [uploadedImage, setUploadedImage] = useState(false);
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
                const imageObj = {
                  name: file.name,
                  type: file.type,
                  size: file.size,
                };
                reader.onload = () => {
                  newList.push(imageObj);
                  setImageList(newList);
                };
                reader.readAsDataURL(file);
              }
            };
            
      const handleUpload=()=>{
              // setResult(imageList); 
              setUploadedImage(true) 
          }
          const SubmitValidation = (e) => {
      e.preventDefault();
      setResult({...formData, images: uploadedImage ? imageList : "Please hit the upload button"});
      setformData({  Car_Name : "",                
      Car_Modal : "",              
      Purchase_Year : "",           
      Transmission : "",          
      Fuel_Type : "",  });
       setMessage("Your response has been submitted")    };
    const handleClear = () => {
      setformData({});
      setImageList([]);
      setUploadedImage(false);
      setResult(false);
    };
  
    const autofillData=()=>{
      setformData({  Car_Name : "Toyota",                
      Car_Modal : "V4",              
      Purchase_Year : "2022",           
      Transmission : "auto",          
      Fuel_Type : "petrol",  });
    };
  
    return (
      <form onSubmit={SubmitValidation}>
          <div className="form-page">
            <div className="form-container">
             
              


{/* 
                  <div className="input-group input-group-sm  mb-4">
                      <span class="input-group-text" id="addon-wrapping">Car Name</span>
                      <input onChange ={handleOnChange}  value={formData.Car_Name} name = "Car_Name" type="text" className="form-control" placeholder="Enter Your car Name"aria-label="Input1" aria-describedby="addon-wrapping" required />
                  </div>
                  
                  <div className="input-group input-group-sm  mb-4">
                      <span class="input-group-text" id="addon-wrapping">Car Modal</span>
                      <input  onChange ={handleOnChange}   value={formData.Car_Modal} name = "Car_Modal"  type="text" className="form-control" placeholder= "Enter Your car Model" aria-label="Input2" aria-describedby="addon-wrapping" required/>
                  </div>
              
                  <div className="input-group input-group-sm  mb-4">
                       <span class="input-group-text" id="addon-wrapping">Purchase Year</span>
                       <input onChange={handleOnChange}  value={formData.Purchase_Year} name = "Purchase_Year" type="text" className="form-control" placeholder="Enter the Purchase date" aria-label="Input3" aria-describedby="addon-wrapping" onKeyPress={(event) => {   if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} required/>
                   </div>

                   <div className="input-group input-group-sm  mb-4">
                       <span class="input-group-text" id="addon-wrapping">Transmission</span>
                       <input onChange ={handleOnChange}   value={formData.Transmission} name = "Transmission"  type="text" className="form-control" placeholder="Enter the Transmission Type" aria-label="Input4" aria-describedby="addon-wrapping" required/>
                   </div>
              
                  <div className="input-group input-group-sm  mb-4">
                      <span class="input-group-text" id="addon-wrapping">Fuel type</span>
                      <input onChange ={handleOnChange}   value={formData.Fuel_Type} name = "Fuel_Type" type="text" className="form-control" placeholder="Enter Fuel Type" aria-label="Input5" aria-describedby="addon-wrapping" required/>
                  </div>  */}
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
                       <button className='upload-btn' onClick={handleUpload} required >Upload</button>
                  </div>
                  <button  type="submit" class="btn btn-success" >Submit</button>
              <button type="button" onClick={handleClear}class="btn btn-outline-danger" >Clear</button>
              <span className='message-text'>{message}</span>
                  </div>

                      







                  
              
              
              {/* <div className="result"  style={{
                  margin:"0 auto",
                  display:'flex',
                  flexDirection:"column",
                 }}>
                 Output :  { result ? JSON.stringify(result) : "not found"}
              </div>  
              <button onClick={autofillData}>autofill</button> */}
              </div>
            </div>
      </form>
    )
  }
  
  export default Input_form;
  