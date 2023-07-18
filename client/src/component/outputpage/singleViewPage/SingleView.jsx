import React, { useEffect, useState } from 'react';
import {AiFillFolderAdd} from 'react-icons/ai'
import {MdDelete, MdOutlineCancelPresentation} from 'react-icons/md';
import {BiEdit} from 'react-icons/bi';
// import {VscSave} from 'react-icons/vs';
import DataContext from '../../Context/context';
import axios from 'axios';
import {RiSaveLine} from 'react-icons/ri';
import { ThemeProvider } from 'react-bootstrap';

const EmptyBootstrapTheme = {};

const InputSection = ({ index, handleOnChange, value, placeholders, formData }) => {

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

   const type = index === 2 ? "number" : "text";

  return (
    <div className=" -mt-2 md:-mt-4 w-100% md:w-150%">
      <input
        onChange={handleOnChange}
        value={value}
        name={name}
        type={type}
        className=" rounded-md pl-1 md:h-7  text-xss md:text-xs mt-2 uppercase w-100%"
        placeholder={placeholders[index]}
        aria-describedby="addon-wrapping"
        required 
        onKeyPress={(event) => index === 2 ? (!/[0-9]/.test(event.key) && event.preventDefault()) : null}
      />
    </div>
  );
};


const SingleView = () => {

  const fieldName = ["Car Name", "Car Modal", "Purchase Year", "Transmission", "Fuel Type", "Total Image"];

  const dbURL = 'http://localhost:5000/entries';

  const {inputData} = React.useContext(DataContext);
  const [imageRecieved, setImageRecieved] = React.useState(false);
  const [imageArray, setImageArray] = React.useState([]);
  const [productId]= useState(()=>localStorage.getItem('productId'));
  const [url, setUrl] = useState();
  const [editableData, setEditableData] = useState({
    Car_Name : "",                 
    Car_Modal : "",              
    Purchase_Year : "",           
    Transmission : "",          
    Fuel_Type : "", 
    Total_Images:""
  });
  const [editingPanel, setEditingPanel] = useState(false);


  useEffect(() => {
    if (inputData) {
      setUrl(inputData);
      localStorage.setItem('productId', inputData);
    } else {
      setUrl(productId);
    }
  }, [inputData]);

  

  const handleImageHide = () => {
    setImageRecieved(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${dbURL}/${url}`);
        setEditableData({
          Car_Name : response.data.Car_Name,
          Car_Modal : response.data.Car_Modal,
          Purchase_Year : response.data.Purchase_Year,
          Transmission : response.data.Transmission,
          Fuel_Type : response.data.Fuel_Type,
          Total_Images :response.data.Car_Image.length
        });
        setImageArray(response.data.Car_Image);
      } catch (error) {
        console.log('Something went wrong', error);
      }
    };

    getData();
  }, [url]);

  useEffect(() => {
    setImageRecieved(true);
  }, [imageArray]);

 

  const handleSaveData = async ()=>{
    setEditingPanel(false);
    try {
      
      const updatedFormData = new FormData();
        updatedFormData.append('Car_Name',editableData.Car_Name);
        updatedFormData.append('Car_Modal', editableData.Car_Modal);
        updatedFormData.append('Purchase_Year', editableData.Purchase_Year);
        updatedFormData.append('Transmission', editableData.Transmission);
        updatedFormData.append('Fuel_Type', editableData.Fuel_Type);

      const response = await axios.put(`${dbURL}/${url}`,updatedFormData);
      
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const result = await response.data;
      console.log(' this is submited Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  } 



  const handleClosePanel = () =>{
    setEditingPanel(false);
  }

  const handleOnChange = ((event)=>{
    const {name, value} = event.target;
    setEditableData((prevalue)=>({...editableData, [name]:value }));
  })

  const handleEnableEditing = () => {
    setEditingPanel(true)
  }

  const handleImageUpload = (event, index) => {
    const file = event.target.files[index-index];
    // setImageArray((prevData) => ({
    //   ...prevData,
    //   Car_Image: file,
    // }))
    console.log(file);
  };


  const placeholders = {
    0: "Enter Your car Name",
    1: "Enter Your car Model",
    2: "Enter the Purchase date",
    3: "Enter the Transmission Type",
    4: "Enter Fuel Type"
  };

  return (
    <ThemeProvider prefixes={EmptyBootstrapTheme}>
      <div className=" body w-screen h-screen relative bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 ">
      <div  className="content ml-auto mr-auto flex flex-col md:flex-row border-1 border-gray-400 h-92% w-100% bg-gray-500 rounded-xl bg-opacity-30 drop-shadow-xl p-3">
        <div className="details_box w-full md:w-50% h-64 md:h-100%  border-gray-400  bg-gray-100 bg-opacity-30  rounded-xl md:mr-4 mb-2 drop-shadow-xl flex flex-col p-2 ">
        <span className={editingPanel ? 'flex md:mt-3  justify-center border ml-3  md:w-90% w-68% rounded-lg h-6 md:ml-8 align-middle items-center uppercase font-semibold bg-slate-400 bg-opacity-30 drop-shadow-xl tracking-widest text-xs ' : ' flex md:mt-3  justify-center border ml-3   md:w-81% w-74% rounded-lg h-6 md:ml-8 align-middle items-center uppercase font-semibold bg-slate-400 bg-opacity-30 drop-shadow-xl tracking-widest text-xs '}>Car Details
                <span className= {!editingPanel ? ' absolute -right-10  text-green-800 flex justify-center items-center h-100%  w-4 ' : 'hidden'} onClick={handleEnableEditing}>
                        <button type="button" className="btn btn-outline-info h-6 items-center flex w-18 text-xs text-black"><BiEdit/></button>
                        </span>
        </span>
          <span className="border flex flex-wrap mt-2 pt-2 pb-3  rounded-lg bg-white bg-opacity-50  justify-center flex-ro  w-90% ml-auto mr-auto
          gap-3 text-xss md:h-50% ">
          {[...Array(6)].map((_, index) => {
                    return (
                      <span className=' w-40% md:mt-4 md:-mb-2' key={index}>
                        <h6 className=' uppercase tracking-widest font-semibold text-xss md:text-xs mb-1 pl-1 md:pl-1 '>{fieldName[index]}</h6>
                        <span className='relative'>


                        <input className='w-100% border rounded-md bg-opacity-40 bg-slate-100 pl-1 md:pl-1 md:h-8 h-60% text-xsss md:text-sm uppercase'  value={editableData && Object.values(editableData)[index]} readOnly />
                         <span  className={editingPanel ? 'absolute left-0 top-0 cursor-pointer' : 'hidden'}>
                        <InputSection
                        key={index}
                        index={index}
                        handleOnChange={handleOnChange}
                        formData={editableData}
                        value={editableData && Object.values(editableData)[index]}
                        placeholders={placeholders}
                      />
                        
                        </span>
                        </span>

                        <span className={editingPanel ? '  absolute left-48 hidden  md:h-12 md:block bottom-48  w-16  ' : 'hidden'} onClick={handleSaveData}>
                        <button type="button" className="btn btn-outline-info h-8 p-1 items-center flex w-16 justify-center text-xs text-black  uppercase font-semibold ">Updated</button>
                        </span>
                        <span className={editingPanel ? ' absolute left-80 hidden  md:h-12 md:block bottom-48  w-16  ' : 'hidden '}onClick={handleClosePanel}>
                        <button type="button" className="btn btn-outline-danger h-8 p-1 items-center flex w-16 justify-center text-xs uppercase font-semibold text-black">Cancel</button>
                        </span>
                      </span>
                    );
              })}
          </span>
        </div>
        <div className="image_grid  w-full h-96%  border-1 border-gray-400 md:h-100% md:w-60% bg-gray-100 rounded-xl bg-opacity-30 drop-shadow-xl flex flex-col gap-2  ">
        <span className='  flex justify-center ml-auto mr-auto mt-2 w-80% rounded-lg h-6  align-middle items-center uppercase font-semibold bg-slate-400 bg-opacity-30 drop-shadow-xl tracking-widest text-xs'>Media Files</span> 

        <section  className=' p-2 flex md:mt-1 gap-2 justify-center flex-wrap  ml-auto  mr-auto  w-98%  h-85%   ' >
        {[...Array(12)].map((_, index) => (
  <span key={index} className="border-1 relative mt-1 border-black border-dashed rounded-md m-0 flex w-30% h-20%">
    {index < imageArray.length ? (
      <>
        <img className="w-full h-full rounded-md" src={imageArray[index].imgUrl} alt="" />
        <span className="absolute w-3 h-3 md:w-5 md:h-5 md:text-lg text-xs text-white rounded-sm flex justify-center items-center right-1 top-1 hover:border-red-500 hover:bg-red-600 cursor-pointer hover:border-dashed active:bg-white" onClick={handleImageHide}>
          <MdDelete />
        </span>
      </>
    ) : (
      <span className="w-full h-full md:text-5xl text-xl text-gray-500 justify-center flex group items-center rounded-md ">
        <input onChange={(event) => handleImageUpload(event, index)} className='md:text-xs md:border h-full absolute w-full  text-xl text-gray-500 justify-center flex items-center rounded-md opacity-0 cursor-pointer' type="file" accept="image/*" multiple required name="Car_Image" />
        <span className="cursor-pointer  group-active:text-white">
          <AiFillFolderAdd />
        </span>
      </span>
      )}
  </span>
))}
        </section>
        </div>
                        <span className={editingPanel ? '  absolute left-56  md:border md:h-12  flex justify-center items-center md:hidden top-6  w-16  ' : 'hidden'} onClick={handleClosePanel}>
                        <button type="button" className="btn btn-outline-danger h-6 p-1 items-center flex w-18 text-xs text-black"><MdOutlineCancelPresentation/></button>
                        </span>
                        <span className={editingPanel ? ' md:bottom-0 md:border md:h-12  absolute left-64 text-green-800 flex justify-center items-center top-6  w-16 md:hidden ' : 'hidden'}onClick={handleSaveData}>
                        <button type="button" className="btn btn-outline-info h-6 p-1 items-center flex w-18 text-xs text-black"><RiSaveLine/></button>
                        </span>
                        
        </div>
      </div>
      </ThemeProvider>
  ) 
}

export default SingleView
