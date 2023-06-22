/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import './Input_form.scss';




const input2 = (props) => {
    const [Car_Name, setCar_Name] = useState("");
    const [Car_Modal, setCar_Modal] = useState("");
    const [Purchase_Year, setPurchase_Year] = useState("");
    const [Transmission, setTransmission] = useState("");
    const [Fuel_Type, setFuel_Type] = useState("");
    const [Car_Image, setCar_Image] = useState("");

    const [formDataArray, setFormDataArray] = useState([null]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Construct the form data object
        const formData = {
          Car_Name: Car_Name,
          Car_Modal: Car_Modal,
          // Include other form field values
        };
        // Push the current form data to the formDataArray
        setFormDataArray((prevFormDataArray) => [...prevFormDataArray, formData]);
        // Reset the form inputs
        setCar_Name("");
        setCar_Modal("");
        // Reset other form field states
      };

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

      const handleOnChange = (event)=> {
        const { name, value } = event.target;
        switch (name) {
            case "Car_Name":
                setCar_Name(value);
                break;
            case "Car_Modal":
                setCar_Modal(value);
                break;
            case "Purchase_Year":
                setPurchase_Year(value);
                break;
            case "Transmission":
                setTransmission(value);
                break;
            case "Fuel_Type":
                setFuel_Type(value);
                break;
            default:
                break;
        }
    }
    

      const handleFileChange = (event) => {
        const files = event.target.files;
          const reader = new FileReader();
          const file = files[0];
          reader.onload = () => {
            const imageDataURL = reader.result;
        //   setFormData({ ...formData, Car_Image: imageDataURL });
          setCar_Image(imageDataURL);
          };
          reader.readAsDataURL(file);
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        console.log("formDataArray:", formDataArray, new Date().toISOString());
      }, [formDataArray]);
      


  return (
    <form onSubmit={handleSubmit}>
        <div className="form-page">
             <div className="form-container">
                <div className="form-inputs">
                    <div className="input-group   input-group-sm mb-4">
                        <span className="input-group-text">{titles[0]}
                        </span>
                        <input
                           onChange={handleOnChange}
                           value={Car_Name}
                           name="Car_Name"
                           type="text"
                           className="form-control"
                           placeholder={placeholders[0]}
                           aria-describedby="addon-wrapping"
                           require ='true' />                       

                   </div>  
                  <div className="input-group   input-group-sm mb-4">
                        <span className="input-group-text">{titles[1]}
                        </span>
                         <input
                           onChange={handleOnChange}
                           value={Car_Modal}
                           name='Car_Modal'
                           type="text"
                           className="form-control"
                           placeholder={placeholders[1]}
                           aria-describedby="addon-wrapping" required
                         />
                         
                   </div>  
                     
                   <div className="input-group   input-group-sm mb-4">
                        <span className="input-group-text">{titles[2]}
                        </span>
                         <input
                           onChange={handleOnChange}
                           value={Purchase_Year}
                           name='Purchase_Year'
                           type="text"
                           className="form-control"
                           placeholder={placeholders[2]}
                           aria-describedby="addon-wrapping" required
                         />
                   </div>  
                   <div className="input-group   input-group-sm mb-4">
                        <span className="input-group-text">{titles[3]}
                        </span>
                         <input
                           onChange={handleOnChange}
                           value={Transmission}
                           name='Transmission'
                           type="text"
                           className="form-control"
                           placeholder={placeholders[3]}
                           aria-describedby="addon-wrapping" required
                         />
                   </div>  
                   <div className="input-group   input-group-sm mb-4">
                        <span className="input-group-text">{titles[4]}
                        </span>
                         <input
                           onChange={handleOnChange}
                           value={Fuel_Type}
                           name='Fuel_Type'
                           type="text"
                           className="form-control"
                           placeholder={placeholders[4]}
                           aria-describedby="addon-wrapping" required
                         />
                   </div>             
                    <div className="input-group input-group-sm  mb-4">
                       <input type="file" accept="image/*" multiple={false} onChange={handleFileChange} required />
                    </div>
                    {/* <button  type="submit" className="btn btn-success" >Submit</button>
                    <span className='message-text'>{message}</span> */}
                </div>
              {/* <button onClick={autofillData}>autofill</button> */}
            </div>
        </div>
    </form>
  )      
}      

export default input2
