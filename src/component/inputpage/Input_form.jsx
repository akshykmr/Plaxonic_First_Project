import React,{useState } from 'react';
import './Input_form.scss';
// import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/context';
// import IMG from '../../assets/1.jpg'
import IMG1 from '../../assets/2.avif'
import IMG2 from '../../assets/3.avif'
import IMG3 from '../../assets/4.avif'
import IMG4 from '../../assets/5.avif'
import IMG5 from '../../assets/6.avif'
// import IMG6 from '../../assets/7.avif'
// import IMG7 from '../../assets/8.avif'
// import IMG8 from '../../assets/9.avif'
// import IMG9 from '../../assets/10.avif'
 
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
      
    
      // const NavigateToInputForm =()=>{ // this will automatically navigated to outputpage
      //   navigate(`/OutputPage`)
      // };

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

          // setTimeout(function() {
          //   setMessage("Redirecting to Result page in 3 seconds...");
          // }, 3000);
          // setTimeout(function() {
          // //  NavigateToInputForm();
          // }, 6000);

          setFromDataArray(prevFormDataArray => [...prevFormDataArray, formData]);

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
      
      
      React.useEffect(() => {
        if (formSubmitted) {
          getInputData(formDataArray);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formDataArray, formSubmitted]);
     

      const randomFormData =[
        {
          "Car_Name": "Toyota",
          "Car_Modal": "V4",
          "Purchase_Year": "2022",
          "Transmission": "Auto",
          "Fuel_Type": "Petrol",
          "Car_Image": {IMG1}
        },
        {
          "Car_Name": "Honda",
          "Car_Modal": "Civic",
          "Purchase_Year": "2022",
          "Transmission": "Manual",
          "Fuel_Type": "Gasoline",
          "Car_Image": {IMG2}
        },
        {
          "Car_Name": "Ford",
          "Car_Modal": "Mustang",
          "Purchase_Year": "2022",
          "Transmission": "Auto",
          "Fuel_Type": "Petrol",
          "Car_Image": {IMG3}
        },
        {
          "Car_Name": "Chevrolet",
          "Car_Modal": "Corvette",
          "Purchase_Year": "2022",
          "Transmission": "Manual",
          "Fuel_Type": "Gasoline",
          "Car_Image": {IMG4}
        },
        {
          "Car_Name": "Tesla",
          "Car_Modal": "Model S",
          "Purchase_Year": "2022",
          "Transmission": "Auto",
          "Fuel_Type": "Electric",
          "Car_Image": {IMG5}
        }
      ]
      const autofillData = () => {
        const randomIndex = Math.floor(Math.random() * randomFormData.length);
        const randomData = randomFormData[randomIndex];
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
  