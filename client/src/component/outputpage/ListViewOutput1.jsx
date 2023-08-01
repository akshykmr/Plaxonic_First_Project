/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./ListViewOutput.scss";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { IoIosRefreshCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DataContext from "../Context/context";

const ListViewOutput = () => {
  const navigate = useNavigate();
  const { getInputData } = React.useContext(DataContext);

  const [outputData, setOutputData] = useState();
  const [dataForFilter, setDataforFilter] = useState();
  const [isOuputRecieved, setIsOutputReceived] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [clickAction, setClickAction] = useState(false);

  const handleOpenItem = (index) => {
    navigate(`/SingleView`);
    // console.log("index of clicked item ", index,outputData[index]);
    getInputData(outputData[index]._id);
  };

  ///// FETCHING DATA FROM BACKEND
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/entries");
      const receivedData = response.data;
      setOutputData(receivedData);

      // Find the first valid image URL as thumbnail for each item in receivedData
      const thumbnailsArray = receivedData.map((data) => {
        for (let i = 0; i < data.Car_Image.length; i++) {
          if (data.Car_Image[i].imgUrl !== "result.url") {
            return data.Car_Image[i].imgUrl;
          }
        }
        return null; // If no valid image URL is found for an item
      });

      setThumbnails(thumbnailsArray);
      setDataforFilter(receivedData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setClickAction(false);
  }, [clickAction]);

  const handleRefresh = () => {
    fetchData();
    // console.log("this is output data : ", outputData[0].Car_Image[0].imgPublic_Id);
  };

  const handleRemoveSingleItem = async (index) => {
    setClickAction(true);
    const confirmDel = window.confirm(
      "Are you sure you want to delete the selected items?"
    );
    // console.log("this is selected object", outputData[index]._id);
    const objectData = {
      objectId: outputData[index]._id,
      objectImageDetails: outputData[index].Car_Image,
    };
    if (confirmDel) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/entries/${objectData.objectId}`,
          {
            data: objectData,
          }
        );
        console.log("Object deleted successfully:", response.data);
        // Handle any further actions after deletion
      } catch (error) {
        console.error("Error deleting object:", error);
        // Handle error cases
      }
    }
    console.log("this is object data for delete", objectData);
  };

  const handleCheckboxClick = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // useEffect(()=>{
  //   console.log("selected",selectedItems);
  // },[selectedItems])

  const handleCheckboxClickAll = () => {
    if (
      outputData &&
      Array.isArray(outputData) &&
      selectedItems.length === outputData.length
    ) {
      setSelectedItems([]);
    } else if (outputData && Array.isArray(outputData)) {
      setSelectedItems([...Array(outputData.length).keys()]);
    }
  };

  const handleRemoveAllItemsList = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to delete.');
      return;
    }
  
    const confirmDel = window.confirm(
      'Are you sure you want to delete the selected items?'
    );
  
    if (confirmDel) {
      setClickAction(true);
      try {
        await Promise.all(
          selectedItems.map((index) => {
            const objectData = {
              objectId: outputData[index]._id,
              objectImageDetails: outputData[index].Car_Image,
            };
            return axios.delete(`http://localhost:5000/entries/${objectData.objectId}`, {
              data: objectData,
            });
          })
        );
        console.log('All objects deleted successfully');
      } catch (error) {
        console.error('Error deleting objects:', error);
      }
      setSelectedItems([]);
    }
  };
  

  useEffect(() => {
    if (outputData && outputData.length > 0) {
      setIsOutputReceived(true);
      // console.log(outputData);
    } else if (outputData && outputData.length <= 0) {
      setIsOutputReceived(false);
    }
  }, [outputData]);

  // FILTER FUNCTIONALITY

  const [selectCarName, setSelectCarName] = useState();
  const [selectCarModal, setSelectCarModal] = useState();
  const [selectPurchasedYear, setSelectPurchaseYear] = useState();
  const [selectFuelType, setSelectFuelType] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [alertType, setAlertType] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  const handleSelectCarName = (e) => {
    setSelectCarName(e.target.value);
    setSelectCarModal("");
  };
  const handleSelectCarModal = (e) => {
    setSelectCarModal(e.target.value);
  };
  const handleSelectPurchaseYear = (e) => {
    setSelectPurchaseYear(e.target.value);
  };
  const handleFuelType = (e) => {
    setSelectFuelType(e.target.value);
  };

  const filteredCarModels =
    dataForFilter &&
    Array.isArray(dataForFilter) &&
    dataForFilter
      .filter((data) => data.Car_Name === selectCarName)
      .reduce((uniqueModel, data) => {
        if (!uniqueModel.includes(data.Car_Modal)) {
          uniqueModel.push(data.Car_Modal);
        }
        return uniqueModel;
      }, []);

  const handleFilter = () => {
    let filteredData = [];

    if (dataForFilter && dataForFilter.length) {
      filteredData = dataForFilter.filter((item) => {
        if (
          (!selectCarName || item.Car_Name === selectCarName) &&
          (!selectCarModal || item.Car_Modal === selectCarModal) &&
          (!selectPurchasedYear ||
            item.Purchase_Year.toString() === selectPurchasedYear) && // Compare as strings
          (!selectFuelType || item.Fuel_Type === selectFuelType)
        ) {
          return true;
        }
        return false;
      });
      if (filteredData.length > 0) {
        setOutputData(filteredData);
        setIsVisible(false);
      } else {
        setIsVisible(true);
        setAlertType(1);
      }
    } else {
      setIsVisible(true);
      setAlertType(2);
    }
  };

  const alertMsg =
    isVisible === true && alertType === 1 && outputData ? (
      <strong>Alert! Items Not Found</strong>
    ) : isVisible === true && alertType === 2 ? (
      <strong>Alert! Please Create an Entry First...</strong>
    ) : null;

  const handleClear = () => {
    if (
      selectCarName ||
      selectCarModal ||
      selectFuelType ||
      selectPurchasedYear
    ) {
      setSelectCarName("");
      setSelectCarModal("");
      setSelectFuelType("");
      setSelectPurchaseYear("");
    }
    setOutputData(dataForFilter);
    setIsVisible(false);
  };

  const handleCloseAlert = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <div className="page_container">
        <div className="pagebody">
          <div className="filter-bar">
            {isVisible && (
              <div className="alert">
                <span className="closebtn" onClick={handleCloseAlert}>
                  &times;
                </span>
                {alertMsg}
              </div>
            )}
            <div className="filter-box">
              <div className="col-md-2 pt-1">
                <div className="form-group ">
                  <select
                    id="inputState "
                    className="form-control"
                    value={selectCarName}
                    onChange={handleSelectCarName}
                  >
                    {/* <option selected >Brand</option> */}
                    <option value="Brand">Brand</option>
                    {dataForFilter &&
                      Array.isArray(dataForFilter) &&
                      dataForFilter
                        .reduce((uniqueName, data) => {
                          if (!uniqueName.includes(data.Car_Name)) {
                            uniqueName.push(data.Car_Name);
                          }
                          return uniqueName;
                        }, [])
                        .map((carName, index) => (
                          <option key={index} value={carName}>
                            {carName}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
              <div className="col-md-2 pt-1">
                <div className="form-group">
                  <select
                    id="inputState"
                    className="form-control"
                    value={selectCarModal}
                    onChange={handleSelectCarModal}
                  >
                    <option value="Model">Model</option>
                    {filteredCarModels &&
                      filteredCarModels.map((carModel, index) => (
                        <option key={index} value={carModel}>
                          {carModel}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-2 pt-1">
                <div className="form-group">
                  <select
                    id="inputState"
                    className="form-control"
                    value={selectPurchasedYear}
                    onChange={handleSelectPurchaseYear}
                  >
                    <option value="">Purchased Year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
              <div className="col-md-2 pt-1">
                <div className="form-group">
                  <select
                    id="inputState"
                    className="form-control"
                    value={selectFuelType}
                    onChange={handleFuelType}
                  >
                    <option value="Fuel Type">Fuel Type</option>
                    <option>Electric</option>
                    <option>Gasoline</option>
                    <option>Petrol</option>
                  </select>
                </div>
              </div>
              <div className="col-md-0 pt-1">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
              <div className="col-md-0 pt-1">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <div className="col-md-0 pt-1">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleRefresh}
                >
                  <IoIosRefreshCircle />
                </button>
              </div>
            </div>
          </div>
          <div className="title_bar">
            <ul>
              <li>
                <div className="form-check">
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
              <li onClick={() => handleRemoveAllItemsList()}>
                <TiDeleteOutline />
              </li>
            </ul>
          </div>
          {isOuputRecieved ? (
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              {outputData.map((outputData, index) => (
                <li key={index}>
                  <div className="response_list_bar">
                    <ul>
                      <li>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={index}
                            id="flexCheckDefault"
                            defaultChecked={selectedItems.includes(index)}
                            onClick={() => handleCheckboxClick(index)}
                          />
                        </div>
                      </li>
                      <li onClick={() => handleOpenItem(index)}>{index + 1}</li>
                      <li>
                        <span onClick={() => handleOpenItem(index)}>
                          {thumbnails[index] ? (
                            <img src={thumbnails[index]} alt="" />
                          ) : (
                            <div>No Image</div>
                          )}
                        </span>
                      </li>
                      <li onClick={() => handleOpenItem(index)}>
                        {outputData.Car_Name}
                      </li>
                      <li onClick={() => handleOpenItem(index)}>
                        {outputData.Car_Modal}
                      </li>
                      <li onClick={() => handleOpenItem(index)}>
                        {outputData.Purchase_Year}
                      </li>
                      <li onClick={() => handleOpenItem(index)}>
                        {outputData.Transmission}
                      </li>
                      <li onClick={() => handleOpenItem(index)}>
                        {outputData.Fuel_Type}
                      </li>
                      <li
                        type="button"
                        onClick={() => handleRemoveSingleItem(index)}
                      >
                        <TiDeleteOutline />
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ margin: "10px" }}>Empty List</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListViewOutput;
