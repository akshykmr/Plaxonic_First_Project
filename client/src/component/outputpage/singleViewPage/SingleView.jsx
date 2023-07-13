import React, { useEffect, useState } from 'react';
import {AiFillFolderAdd} from 'react-icons/ai'
import {MdDelete, MdOutlineCancelPresentation} from 'react-icons/md';
import {BiEdit} from 'react-icons/bi';
// import {VscSave} from 'react-icons/vs';
import DataContext from '../../Context/context';
import axios from 'axios';
import {RiSaveLine} from 'react-icons/ri'




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

    const handleChange = (event) => {
  if (value === event.target.value) {
    handleOnChange(event);
  }
};


   const type = index === 2 ? "number" : "text";

  return (
    <div className="input-group input-group-sm mb-4">
      <input
        onChange={handleChange}
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


const SingleView = () => {

  const fieldName = ["Car Name", "Car Modal", "Purchase Year", "Transmission", "Fuel Type"];

  const dbURL = 'http://localhost:5000/entries';

  const {inputData} = React.useContext(DataContext);
  const [data, setData] = React.useState();
  const [imageRecieved, setImageRecieved] = React.useState(false);
  const [imageArray, setImageArray] = React.useState([]);
  const [productId]= useState(()=>localStorage.getItem('productId'));
  const [url, setUrl] = useState();
  const [ editedData, setEditedData] = useState({
    Car_Name : "",                 
    Car_Modal : "",              
    Purchase_Year : "",           
    Transmission : "",          
    Fuel_Type : "", 
    Car_Image : [],
  });
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    if (inputData) {
      setUrl(inputData);
      localStorage.setItem('productId', inputData);
    } else {
      setUrl(productId);
    }
  }, [inputData]);

  const handleImageShow = () => {
    setImageRecieved(true);
  };

  const handleImageHide = () => {
    setImageRecieved(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dbURL}/${url}`);
        setData(response.data);
        setImageArray(response.data.Car_Image);
        console.log('Full response', response.data.Car_Image);
      } catch (error) {
        console.log('Something went wrong', error);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    setImageRecieved(true);
  }, [imageArray]);

  const handleTextEdit =(event)=>{
    setEditedData(event.target.value);
  }  

  const handleEditOpen =()=>{
    setEditing(true);
  };

  const handleEditClose =()=>{
    setEditing(false);
  } 

  const handleOnChange = ((event)=>{
    const {name, value} = event.target;
    setEditedData((prevalue)=>({...editedData, [name]:value }));
  })
  const placeholders = {
    0: "Enter Your car Name",
    1: "Enter Your car Model",
    2: "Enter the Purchase date",
    3: "Enter the Transmission Type",
    4: "Enter Fuel Type"
  };

  return (
    <>
      <div className="w-screen h-screen relative bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 ">
      <div  className="content ml-auto mr-auto md:flex flex flex-col md:flex-row border-1 border-gray-400 h-92% w-100% bg-gray-500 rounded-xl bg-opacity-30 drop-shadow-xl p-3">
        <div className="details_box w-full h-64  border-gray-400 md:h-100% md:w-50% bg-gray-100 bg-opacity-30  rounded-xl md:mr-4 mb-2 drop-shadow-xl flex flex-col p-2 ">
        <span className=' flex md:mt-3  justify-center ml-auto mr-auto w-80% rounded-lg h-6  align-middle items-center uppercase font-semibold bg-slate-400 bg-opacity-30 drop-shadow-xl tracking-widest text-xs '>Car Details</span>
          <div className="details_section  flex flex-wrap mt-2 justify-center flex-ro p-1 text-xs md:text-lg  gap-2 ">
          {[...Array(5)].map((_, index) => {
                    return (
                      <span className=' w-48%  md:mt-20   pl-1 ' key={index}>
                        <h6 className=' uppercase tracking-widest font-semibold text-xss md:text-xs md:p-2 mb-1 '>{fieldName[index]}</h6>
                        <span className='relative'>
                        <input className='w-75% rounded-md bg-opacity-40 bg-slate-100 p-1 h-40%'  value={data && Object.values(data)[index+1]} onChange={handleTextEdit} readOnly />
                        <span className=' absolute right-1 flex justify-center items-center top-0 h-100% 
                        w-4 cursor-pointer ' onClick={handleEditOpen}>
                        <BiEdit/>
                        </span>
                        <span className={ editing ? 'absolute left-0 top-10 cursor-pointer' : 'hidden'}>
                        <InputSection
                        key={index}
                        index={index}
                        handleOnChange={handleOnChange}
                        formData={editedData}
                        value={data && Object.values(data)[index+1]}
                        placeholders={placeholders[index]}
                      />
                        <span className=' absolute left-4 text-green-800 flex justify-center items-center top-8 h-100% 
                        w-4  ' onClick={handleEditClose}>
                        <button type="button" class="btn btn-outline-info h-6 items-center flex w-18 text-xs text-black">Save</button>
                        </span>
                        <span className='  absolute left-20 text-green-800 flex justify-center items-center top-8 h-100% 
                        w-4  ' onClick={handleEditClose}>
                        <button type="button" class="btn btn-outline-danger h-6 items-center flex w-18 text-xs text-black">Cancel</button>
                        </span>
                        </span>
          
                        </span>
                      </span>
                    );
              })}
          </div>
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
      <span className="w-full h-full md:text-5xl text-xl text-gray-500 justify-center flex items-center rounded-md">
        <span className="cursor-pointer active:text-white" onClick={handleImageShow}>
          <AiFillFolderAdd />
        </span>
      </span>
      )}
  </span>
))}
        </section>
        </div>
        </div>
      </div>
    </>
  ) 
}

export default SingleView
