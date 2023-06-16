import './App.css';
import React, { useEffect, useState } from "react";

import Header from './component/header/Header_';
import InputForm from './component/inputpage/Input_form';
import OutputPage from './component/outputpage/Output_page';
// import Navbar from './component/header/Navbar';

function App() {
  const [inputImportedData, setInputImportedData] = useState(false);

  const getInputData =(result)=>{
    setInputImportedData(result);
  }

  useEffect(()=>{
    // console.log("this is app data " ,inputImportedData);
  }, [inputImportedData]);
  
  return (
    <>
       <Header/>
       <InputForm getInputData={getInputData}  />
       <OutputPage inputImportedData={inputImportedData}/>
      
       {/* <Navbar/> */}
    </>
  );
}

export default App;
