/* eslint-disable react-hooks/rules-of-hooks */
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

      const handleCheckboxClickAll = () => {
        if (inputImportedData && Array.isArray(inputImportedData) && selectedItems.length === inputImportedData.length) {
          // If all items are already selected, clear the selected items array
          setSelectedItems([]);
        } else if (inputImportedData && Array.isArray(inputImportedData)) {
          // Select all items by storing their index values in the selected items array
          setSelectedItems([...Array(inputImportedData.length).keys()]);
        }
      };
      
      
      
      
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



      // FILTER FUNCTIONALITY 

      const [selectCarName, setSelectCarName] = useState();
      const [selectCarModal, setSelectCarModal] = useState();
      const [selectPurchasedYear, setSelectPurchaseYear] = useState();
      const [selectFuelType, setSelectFuelType] = useState();
      const [isVisible, setIsVisible] = useState(false);
      const [alertType, setAlertType] = useState(0);

      


      const handleSelectCarName     = (e) =>{
        setSelectCarName(e.target.value)
      }
      const handleSelectCarModal     =(e) =>{
        setSelectCarModal(e.target.value)
      }
      const handleSelectPurchaseYear =(e) =>{
        setSelectPurchaseYear(e.target.value)
      }
      const handleFuelType           =(e) =>{
        setSelectFuelType(e.target.value)
      }

      const handleFilter = () => {
        let filteredData = [];

        if (inputImportedData && inputImportedData.length) {
          filteredData = inputImportedData.filter((item) => {
            if (
              (!selectCarName || item.Car_Name === selectCarName) &&
              (!selectCarModal || item.Car_Modal === selectCarModal) &&
              (!selectPurchasedYear || item.Purchase_Year === selectPurchasedYear) &&
              (!selectFuelType || item.Fuel_Type === selectFuelType)
            ) {
              return true;
            }
            return false;
          });
          if(filteredData.length>0){
            setInputImportedData(filteredData);
            setIsVisible(false);
          }
          else {
            setIsVisible(true);
            setAlertType(1);
          }
        } 
        else {
          setIsVisible(true);
          setAlertType(2);
        }
        
      };
      
      const alertMsg = isVisible === true && alertType === 1 && inputImportedData
  ? <strong>Alert! Items Not Found</strong>
  : isVisible === true && alertType === 2 
  ? <strong>Alert! Please Create an Entry First...</strong>
  : null;


      const handleClear = () => {
        if (selectCarName || selectCarModal || selectFuelType || selectPurchasedYear) {
          setSelectCarName("");
          setSelectCarModal("");
          setSelectFuelType("");
          setSelectPurchaseYear("");
        }
      };
      
      const handleClick = () => {
        setIsVisible(false);
      };



  return (
    <div>
      <div className="page_container">
        <div className="pagebody">
          <div className="filter-bar">
          {isVisible && 
          <div className="alert">
            <span className="closebtn" onClick={handleClick} >&times;</span> 
            {alertMsg}
          </div>}
              <div  className="filter-box">
            	  <div  className="col-md-2 pt-1">
                   <div  className="form-group ">
                      <select id="inputState "  className="form-control" value={selectCarName} onChange={handleSelectCarName} >
                        <option selected >Brand</option>
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Ford</option>
                        <option>Chevrolet</option>
                        <option>Tesla</option>
                      </select>
                   </div>
                </div>
                <div  className="col-md-2 pt-1">
                    <div  className="form-group">
                       <select id="inputState"  className="form-control" value={selectCarModal} onChange={handleSelectCarModal} >
                         <option selected>Model</option>
                         <option>V4</option>
                         <option>Civic</option>
                         <option>Mustang</option>
                         <option>Corvette</option>
                         <option>Model S</option>
                       </select>
                    </div>
                </div>
                <div  className="col-md-2 pt-1">
                     <div  className="form-group">
                       <select id="inputState"  className="form-control" value={selectPurchasedYear} onChange={handleSelectPurchaseYear} >
                         <option selected>Purchased Year</option>
                         <option>2022</option>
                         <option>2023</option>
                         <option>2024</option>
                         <option>2025</option>
                       </select>
                     </div>
                </div>
                <div  className="col-md-2 pt-1">
                     <div  className="form-group">
                       <select id="inputState"  className="form-control" value={selectFuelType} onChange={handleFuelType} >
                         <option selected>Fuel Type</option>
                         <option>Electric</option>
                         <option>Gasoline</option>
                         <option>Petrol</option>
                       </select>
                     </div>
                </div>
                <div  className="col-md-0 pt-1">
            	     <button type="button"  className="btn btn-outline-primary" onClick={handleFilter}>Filter</button>
            	   </div>
                 <div  className="col-md-0 pt-1">
            	     <button type="button"  className="btn btn-outline-danger" onClick={handleClear}>Clear</button>
            	   </div>
                  </div>
                  </div>
          <div className="title_bar">
                <ul>
                    <li>
                        <div  className="form-check">
                        <input
                           className="form-check-input"
                           type="checkbox"
                           value="all"
                           id="flexCheckDefault"
                           //checked={selectedItems.length === inputImportedData.length}
                          onChange={handleCheckboxClickAll}
                           />

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
                        <div  className="form-check">
                           <input  className="form-check-input" type="checkbox" value={index} id="flexCheckDefault" checked={selectedItems.includes(index)}
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
