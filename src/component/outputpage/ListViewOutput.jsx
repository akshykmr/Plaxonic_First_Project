import React,{useEffect, useState} from 'react';
import './ListViewOutput.scss';
// import IMG from '../../assets/1.jpg'
import {TiDeleteOutline} from 'react-icons/ti';
import DataContext from '../Context/context';
import { useNavigate } from 'react-router-dom';




const ListViewOutput = () => {

    const [selectedItems, setSelectedItems] = useState([]);


    const navigate = useNavigate();

    const NavigateToInputForm =()=>{ // this will automatically navigated to outputpage
      navigate(`/`)
    };
  
  
    const {inputImportedData,setInputImportedData} = React.useContext(DataContext);
  
    const[isOuputRecieved, setIsOutputReceived] = useState(false);
    const [message, setMessage] = useState("");
    
    const handleRemove = (index) => {
      setInputImportedData((prevData) =>
        prevData.filter((_, i) => i !== index)
      );
    
      if (inputImportedData.length === 1) {
        let countdown = 3;
        const countdownInterval = setInterval(() => {
          if (countdown === 0 ) {
            clearInterval(countdownInterval);
            NavigateToInputForm();
            return;
          }
          setMessage(`Redirecting to Result page in ${countdown} seconds...`);
          countdown--;
        }, 1000);
      }
    };
    
    const handleCheckboxClick = (index) => {
        if (selectedItems.includes(index)) {
          setSelectedItems(selectedItems.filter((item) => item !== index));
        } else {
          setSelectedItems([...selectedItems, index]);
        }
      };

    //   const handleCheckboxClickAll = () => {
    //     if (inputImportedData && Array.isArray(inputImportedData) && selectedItems.length === inputImportedData.length) {
    //       // If all items are already selected, clear the selected items array
    //       setSelectedItems([]);
    //     } else if (inputImportedData && Array.isArray(inputImportedData)) {
    //       // Select all items by storing their index values in the selected items array
    //       setSelectedItems([...Array(inputImportedData.length).keys()]);
    //     }
    //   };
      
      
      
      
      const handleRemoveList = () => {
        if (inputImportedData) {
        setInputImportedData((prevData) =>
          prevData.filter((_, index) => !selectedItems.includes(index))
        );
        setSelectedItems([]);}
        // else{
        //     setMessage("List is empty")
        // } // Clear the selected items array
      };
      
      


    useEffect(() => {
        if (inputImportedData) {
          setIsOutputReceived(true);
          console.log(inputImportedData);
        }
      }, [inputImportedData]);

  return (
    <div>
      <div className="page_container">
        <div className="pagebody">
            <div className="title_bar">
                <ul>
                    <li>
                        <div class="form-check">
                        {/* <input
                           className="form-check-input"
                           type="checkbox"
                           value="all"
                           id="flexCheckDefault"
                           checked={selectedItems.length === inputImportedData.length}
                           onChange={handleCheckboxClickAll}/> */}

                        </div>
                    </li>
                    <li>Serial Nubmer</li>
                    <li>Car Image</li>
                    <li>Car Name</li>
                    <li>Car Modal</li>
                    <li>Purchase Year</li>
                    <li>Transmission</li>
                    <li>Feul Type</li>
                    <li onClick={() => handleRemoveList()}><TiDeleteOutline/></li>
                </ul>
            </div>

            <span className="response-message">{message}</span>
          {isOuputRecieved ? 
            <ul style={{listStyle:"none", margin:"0", padding:"0"}}>
              {inputImportedData.map((inputImportedData, index)=>(
                <li key={index}>
                 <div className="response_list_bar">
                <ul>
                    <li>
                        <div class="form-check">
                           <input class="form-check-input" type="checkbox" value={index} id="flexCheckDefault" checked={selectedItems.includes(index)}
                           onClick={() => handleCheckboxClick(index)}  />
                        </div>
                    </li>
                    <li>{index+1}</li>
                    <li>
                        <span>
                            <img src={inputImportedData.Car_Image} alt="" />
                        </span>
                    </li>
                    <li>{inputImportedData.Car_Name}</li>
                    <li>{inputImportedData.Car_Modal}</li>
                    <li>{inputImportedData.Purchase_Year}</li>
                    <li>{inputImportedData.Transmission}</li>
                    <li>{inputImportedData.Fuel_Type}</li>
                    <li type='button' onClick={() => handleRemove(index)}><TiDeleteOutline/></li>
                </ul>
            </div>
                </li>
              ))}   
            </ul>   
            : 
          <div style={{margin:"10px"}}>Empty List</div> } 
            
            
        </div>
      </div>
    </div>
  )
}

export default ListViewOutput
