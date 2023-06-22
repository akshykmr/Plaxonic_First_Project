import React,{ useState } from 'react';
import './Input_form.scss';
import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/context';
import IMG from '../../assets/25571.jpg';
import IMG1 from '../../assets/bk.png';
import IMG2 from '../../assets/olc.png';
 



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

  const navigate = useNavigate();

  const NavigateToInputForm =()=>{
    navigate(`/OutputPage`)
}


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
    
    
    const [formData, setformData] = React.useState({
        Car_Name : "",                
        Car_Modal : "",              
        Purchase_Year : "",           
        Transmission : "",          
        Fuel_Type : "", 
        Car_Image : "",
    });  // to store the input text

    const [formDataArray, setFromDataArray] = React.useState([]);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [message, setMessage] = useState();
      

      const handleOnChange = (event)=> {
        const { name, value } = event.target;
          setformData({ ...formData, [name]: value });
      }
  

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
          setMessage("Your response has been submitted") ;  
          setTimeout(function() {
            setMessage("");
          //  NavigateToInputForm();
          }, 4000);
          setFromDataArray(prevFormDataArray => [...prevFormDataArray, formData]);
          setFormSubmitted(true)
        //  console.log( "this is added data",formDataArray)
         setformData({  Car_Name : "",                
          Car_Modal : "",              
          Purchase_Year : "",           
          Transmission : "",          
          Fuel_Type : "", 
          }); // to clear the input fields in input area/box
      };
      
      
      React.useEffect(() => {
        if (formSubmitted) {
          console.log("this is added data", formDataArray);
          getInputData(formDataArray);
        }
      }, [formDataArray, formSubmitted]);
     

      const autofillData=()=>{
        setformData({  Car_Name : "Toyota",                
          Car_Modal : "V4",              
          Purchase_Year : "2022",           
          Transmission : "auto",          
          Fuel_Type : "petrol", 
        });
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



                      <div className="input-group input-group-sm  mb-4">
                       <input type="file" accept="image/*" multiple={false} onChange={handleFileChange} required />
                  </div>
                  <button  type="submit" className="btn btn-success" >Submit</button>
              <span className='message-text'>{message}</span>
                  </div>

                      







                  
              
              
              {/* <div className="result"  style={{
                  margin:"0 auto",
                  display:'flex',
                  flexDirection:"column",
                 }}>
                 Output :  { result ? resultt : "not found"}
              </div>   */}
              <button onClick={autofillData}>autofill</button>
              </div>
            </div>
      </form>
    )
  }
  
  export default Input_form;
  