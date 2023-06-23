import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './component/header/Header_';
import InputForm from './component/inputpage/Input_form';
import OutputPage from './component/outputpage/Output_page';
import LisViewOutput from './component/outputpage/ListViewOutput';
import DataContext from './component/Context/context';




function App() {

  const [inputImportedData, setInputImportedData] = React.useState(null);

  const getInputData =(result)=>{
    setInputImportedData(result);
  }


  return (
    <DataContext.Provider value ={{inputImportedData, getInputData,setInputImportedData}}>
    <BrowserRouter>
       <Header/>
       <Routes>
       <Route path="/" element={<InputForm/>} />
       <Route path ='/OutputPage' element ={<OutputPage/> }/>
       <Route path ='/ListView' element ={<LisViewOutput/> }/>
       </Routes>
    </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
