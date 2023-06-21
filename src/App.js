import './App.css';
import React, { useEffect, useState } from "react";

import Header from './component/header/Header_';
import InputForm from './component/inputpage/Input_form';
import OutputPage from './component/outputpage/Output_page';


// import Dummy from './component/dummyForm2';
// import Print from './component/outputpage/print'

function App() {
  const [inputImportedData, setInputImportedData] = useState(false);

  const getInputData =(result)=>{
    setInputImportedData(result);
  }

  useEffect(()=>{
    // console.log("this is app data " ,inputImportedData);
  }, [inputImportedData]);






  // const [msg, setMsg] = useState(false);

  // const getData = (formData) =>{
  //   setMsg(formData);
  // };

  // useEffect(()=>{
  //   console.log("this is app data " ,msg);
  // }, [msg]);
  


  


  return (
    <>
       <Header/>


       {/* <div  style={{marginBottom:"50px",backgroundColor:"orange"}} className="input">
       <Dummy getData={getData}/>
       </div>



      <div  style={{marginBottom:"50px",backgroundColor:"green"}} className="result">
      <div>App Output is here  :{JSON.stringify(msg)}</div>
      </div>
       

       <div  style={{marginBottom:"50px",backgroundColor:"red"}} className="dive"> 
       <Print msg={msg}/>
       </div> */}




       {/* <Test sentData={sentData}/> */}
       <InputForm getInputData={getInputData}  />
       <OutputPage inputImportedData={inputImportedData}/>
      
       {/* <Navbar/> */}
    </>
  );
}

export default App;
