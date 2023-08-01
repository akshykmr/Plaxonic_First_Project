/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { MdDelete, MdOutlineCancelPresentation } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
// import {VscSave} from 'react-icons/vs';
import DataContext from "../../Context/context";
import axios from "axios";
import { RiSaveLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";



const InputSection = ({
  index,
  handleOnChange,
  value,
  placeholders,
  formData,
}) => {
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
        onKeyPress={(event) =>
          index === 2
            ? !/[0-9]/.test(event.key) && event.preventDefault()
            : null
        }
      />
    </div>
  );
};

const SingleView = (propValue) => {
  const fieldName = [
    "Car Name",
    "Car Modal",
    "Purchase Year",
    "Transmission",
    "Fuel Type",
    "Total Image",
  ];

  const dbURL = "http://localhost:5000/entries";

  const { inputData } = React.useContext(DataContext);
  /// OBJECT ID PASSED BY LIST/GRID VIEW COMPONENT

  const [objectIdInLocalStorage] = useState(() =>
    localStorage.getItem("objectIdInLocalStorage")
  ); /// CREATING LOCAL STORAGE TO STORE OBJECT ID

  const [finalObjectId, setFinalObjectId] = useState(); ///  OBJECT ID (INITIALLY IS INPUTDATA BUT WILL BE FETCH FROM LOCAL STORAGE AFTER RELOAD/REFRESH)

  const [editableData, setEditableData] = useState({
    /// OBJECT TO STORE THE RESPONSE/FORM DATA FETCHED BY API
    Car_Name: "",
    Car_Modal: "",
    Purchase_Year: "",
    Transmission: "",
    Fuel_Type: "",
    Total_Images: "",
    Car_Image: [],
  });

  const [isIImageLoadedAtIndex, setIsImageLoadedAtIndex] = React.useState(
    Array.from({ length: 12 }, () => false)
  );
  /// HANDLING IMG UPLOADING STATUS AT EVERY INDEX AND HANDLING DELETE AND REMOVE ICON/OPTION ON INDIVISUAL IMAGE

  const [actionOnImage, setActionOnImage] = useState(null); /// HANDLING DELETE OR Discard OPERATIONS OF IMAGE

  const [isiImageSelected, setIsImageSelected] = useState(false); /// HANDLING UPDATE BUTTON  DISPLAY FUNCTIONALITY FOR IMG SECTION

  const [editingPanel, setEditingPanel] = useState(false); /// THIS ALLOWS USER TO EDIT RESPONSE IN FORM - TRIGGERS WITH EDIT BUTTON

  const [imgUploadingMode, setImageUploadingMode] = useState("Single"); /// HANDLES THE IMAGE UPLOADING MODES

  const [localImageUrlForMultipleMode, setLocalImageUrlForMultipleMode] =
    useState([]); /// STORING IMG-URL ONLY FROM MULTIPLE MODE AFTER IMG-SELECTION AND PERFORMING FILE-READING FUNCTIONALITY ON EVERY IMAGE

  const [imageForMultimodeUpload, setImageForMultimodeUpload] = useState([]); /// STORING ACTUAL IMAGE FILES(BINARY-FORMAT) TAKEN FROM MULTIPLE MODE WILL BE SENT TO SERVER TO UPDATE IN DB

  const [isImageUploadedFromMultiple, setIsImageUploadedFromMultiple] =
    useState(false); /// HANDLES THE UPDATE/CANCEL BUTTON APPEARANCE ON MULTIPLE MODE

    const [effectWatcher, setEffectWatcher] = useState(false)

    // const [effectWatcher, setEffectWatcher] = useState()

  const placeholders = {
    0: "Enter Your car Name",
    1: "Enter Your car Model",
    2: "Enter the Purchase date",
    3: "Enter the Transmission Type",
    4: "Enter Fuel Type",
  };

  /////////////////////// UPDATING OBJECT ID  ///////////////////////////

  useEffect(() => {
    if (inputData) {
      setFinalObjectId(inputData); /// INITIALLY OBJECTID IS SET AS INPUTDATA(PASSED BY LIST/GRID VIEW)
      localStorage.setItem("objectIdInLocalStorage", inputData);
    } else {
      setFinalObjectId(objectIdInLocalStorage); /// FETCHED FROM LOCAL STORAGE AFTER RELOAD OR REFRESH
    }
  }, [inputData, objectIdInLocalStorage]);

  /////////////////////// FETCH/GET REQUEST ///////////////////////////

  useEffect(() => {
    const getData = async () => {
      try {
        if (!finalObjectId) {
          /// GET REQ ONLY BE EXECUTED IF THERE IS ANY VALUE IN FINALOBJECTID
          return;
        }
        const response = await axios.get(`${dbURL}/${finalObjectId}`); /// SENDING FETCH REQUEST
        setEditableData({
          Car_Name: response.data.Car_Name,
          Car_Modal: response.data.Car_Modal,
          Purchase_Year: response.data.Purchase_Year,
          Transmission: response.data.Transmission,
          Fuel_Type: response.data.Fuel_Type,
          Total_Images: response.data.Car_Image.length,
          Car_Image: response.data.Car_Image,
        });
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    getData();
  }, [finalObjectId,effectWatcher]);

  useEffect(() => {
    if (editableData.Car_Image.length > 0) {
      console.log("array", editableData.Car_Image);
    }
  }, [editableData]);

  // useEffect(() => {
  //   if (localImageUrlForMultipleMode.length > 0)
  //   console.log("img array", localImageUrlForMultipleMode);
  //   setIsImageUploadedFromMultiple(true);
  // }, [localImageUrlForMultipleMode]); //// CHECKING MULTIPLE IMAGE ONLOAD AND STORE FUNCTION

  /////////////////// EVENT LISTNER ON TEXT INPUT : LISTEN AND SET THE EDITED DATA IN FORMDATA (TEXT ONLY) ///////////////////
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setEditableData((prevalue) => ({ ...editableData, [name]: value }));
  };

  /////////////////////// EVEN LISTNER ON IMG INPUT  : IMAGE UPLOADING HANDLER ///////////////////////////

  const handleImageUpload = async (event, index, isMultipleModeON) => {
    if (isMultipleModeON) {
      /// IF MODE IS SET TO MULTIPLE UPLOADING

      const files = event.target.files;
      if (files.length > 6) {
        alert("You can only choose up to 6 files.");
        return;
      }
      const imageDataURLs = [];
      const imageDataFiles = [];
      for (let i = 0; i < files.length && i < 6; i++) {
        const file = files[i];
        imageDataFiles.push(files[i]);
        const reader = new FileReader();
        reader.onload = () => {
          imageDataURLs.push(reader.result);
          if (imageDataURLs.length === Math.min(files.length, 6)) {
            setLocalImageUrlForMultipleMode(imageDataURLs);
          }
        };
        reader.readAsDataURL(file);
      }
      // console.log("=",imageDataFiles)
      setImageForMultimodeUpload(imageDataFiles);
      setIsImageUploadedFromMultiple(true);
    } else {
      /// IF MODE IS SET TO SINGLE UPLOADING

      const file = event.target.files[0];
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pot2cderdddddd");
        formData.append("cloud_name", "dsk9g1uuo");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dsk9g1uuo/image/upload`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const result = await response.json();
        const imagePacket = {
          imgUrl: result.url,
          imgPublic_Id: result.public_id,
        };

        setEditableData((prevData) => {
          /// SETTING IMG URL AFTER IMG UPLOADS IN CLOUDINARY
          const updatedArray = [...prevData.Car_Image];
          updatedArray[index] = imagePacket;
          return { ...prevData, Car_Image: updatedArray };
        });

        setIsImageLoadedAtIndex((prevData) => {
          /// SETTING IMG UPLOAD STATUS AS TRUE AT INDEX FOR EVERY IMAGE INDIVISUALLY THAT WILL HELP REMOVE BUTTON TO APPEAR AT SPECIFIC INDEX AND WILL APPLY SPECIAL CSS AT INDEX
          const updatedData = [...prevData];
          updatedData[index] = true;
          return updatedData;
        });
        // console.log("Image URL:", result.url);
      } catch (error) {
        console.error("Error:", error);
      }
      setIsImageSelected(true); /// THIS WILL HELP UPDATE BUTTON TO APPEAR
    }
  };

  /////////////////////////// HANDLES THE UPDATES/EDITED FIELDS IN FORM-DATA / IMAGE AND SEND THE REQUEST TO SERVER TO STORE IT IN DB ////////////////////////////////////////////

  const handleSaveData = async (
    textformSubmit,
    singleModeImageSubmit,
    multipleModeImageSubmit
  ) => {
    setEditingPanel(false); /// EDITING PANEL WILL CLOSE AFTER HITING SAVE-BUTTON

    if (textformSubmit) {
      /// THIS WILL SAVE EDITED TEXT-DATA ONLY IN FORMDATA AND WILL SEND REQ / IMAGE-DATA EXCLUDED
      try {
        const formData = new FormData();
        formData.append("Car_Name", editableData.Car_Name);
        formData.append("Car_Modal", editableData.Car_Modal);
        formData.append("Purchase_Year", editableData.Purchase_Year);
        formData.append("Transmission", editableData.Transmission);
        formData.append("Fuel_Type", editableData.Fuel_Type);

        const response = await axios.put(
          `${dbURL}/${finalObjectId}`,
          formData,
          {
            headers: { action: "textformData" },
          }
        );

        if (response.status === 200) {
          const result = await response.data;
          console.log(
            response.status,
            " MESSAGE : Text-data has been updated succesfully"
          );
          console.log(" RESPONSE:", result);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (singleModeImageSubmit) {
      /// FOR SINGLE MODE : THIS WILL SEND REQ CONTAINING IMAGE DATA (ALL URLS FOR NEW IMAGES HAVE BEEN ALREADY GENERATED WITH CLOUDINARY API(FRONTEND SIDE) AND STORED IN EDITABLEDATA.CAR_IMAGE OBJECT  )

      setIsImageSelected(false); /// WILL HIDE THE UPDATE BUTTON AFTER SUBMISSION IMAGE DATA

      setIsImageLoadedAtIndex(
        Array.from(Array.from({ length: 12 }, () => false))
      ); /// WILL HIDE "REMOVE" ICON AND CSS AND WILL HELP TO APPEAR DELETE ICON FOR ALL IMAGES  AS ALL VALUES WILL BECOME FALSE WITH THIS
      try {
        const carImages = editableData.Car_Image;
        const response = await axios.put(
          `${dbURL}/${finalObjectId}`,
          { carImages },
          {
            headers: { action: "singleModeImageData" },
          }
        );

        if (response.status === 200) {
          const result = await response.data;
          console.log(
            response.status,
            " MESSAGE : Image Data has been updated succesfully"
          );
          console.log(" RESPONSE:", result);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (multipleModeImageSubmit) {
      /// FOR MULTIPLE MODE
      setIsImageUploadedFromMultiple(false);
      try {
        const formData = new FormData();
        for (const file of imageForMultimodeUpload) {
          //
          formData.append("Car_Image", file);
        }
        // console.log(formData, "this is formdata");
        const response = await axios.put(
          `${dbURL}/${finalObjectId}`,
          formData,
          {
            headers: { action: "multipleModeImageData" },
          }
        );
        if (response.status === 200) {
          const result = response.data;
          console.log(
            response.status,
            " MESSAGE : Image Data has been updated succesfully"
          );
          setEffectWatcher(true);
          setTimeout(() => {
          setEffectWatcher(false);
          }, 1000);
          console.log(" RESPONSE:", result);
        } else {
          throw new Error("FAILURE : REQUEST FAILED");
        }
      } catch (error) {
        console.error("Error :", error);
      }
    }
  };

  /////////////////// OPEN THE EDITING PANEL WHEN EDIT BUTTON IS CLICKED (FOR TEXT FIELD ONLY) ///////////////////
  const handleEnableEditing = () => {
    setEditingPanel(true);
  };

  /////////////////// CLOSE THE EDITING PANEL WHEN CLOSE BUTTON IS CLICKED (FOR TEXT FIELD ONLY) ///////////////////
  const handleDesableEditing = () => {
    setEditingPanel(false);
  };

  //////////////////////// HANDLER : HANDLING UPDATE BUTTON APPERANCE ACCORDING DISCARD FUNCTION AND IMAGE STATUS IN EDITABLE STATE  //////////////////////////////////
  useEffect(() => {
    if (isIImageLoadedAtIndex) {
      // console.log("state of img", isIImageLoadedAtIndex);
      const allZero = isIImageLoadedAtIndex.every((value) => value === false); /// CHECKING IF ALL VALUE ARE FALSE MEANS NO IMAGE IS SELECTED OR ALL SELECTED IMAGES ARE DiscardED/REMOVED
      if (allZero) {
        setIsImageSelected(false);
        // console.log(isiImageSelected);
      } else {
        setIsImageSelected(true);
      }
    }
    // console.log("isIImageLoadedAtIndex:", isIImageLoadedAtIndex);
  }, [actionOnImage]);

  ////////////////////////  DELETE / Discard OPERATION ON IMAGE //////////////////
  const handleDiscardImageUpload = async (
    index,
    isDeleting,
    isCancelUpload
  ) => {
    if (isDeleting) {
      /// SETTING ACTION AS DELETE SO THAT BELOW DELETE FUNCTION WILL BE EXECUTED
      setActionOnImage("Delete");
    } else if (isCancelUpload) {
      /// SETTING ACTION AS PUBLICID OF SELECTED IMG WHICH IS ALREADY UPLOADED ON CLOUDINARY TO PERFORM DELETE/Discard OPERATION ON SPECIFIC IMG OR TO DELETE THE IMG FROM CLOUDINARY : OR PASSING PUBLIC ID AS PROPS TO DELETE FUNCTION
      setActionOnImage(editableData.Car_Image[index].imgPublic_Id);
      setIsImageLoadedAtIndex((prevData) => {
        /// THIS WILL UPDATE THE IMG STATUS AS FALSE AS SOON AS IMG WILL BE DELETED OR Discard AT SPECIFIC INDEX
        const updatedData = [...prevData];
        updatedData[index] = false;
        return updatedData;
      });
    }
    setEditableData((prevData) => {
      /// REMOVING IMG URL(EXISTING URL FETCHED FROM MONGODB OR FETCHED AND STORED BY CLOUDINARY API WHILE UPLOADING NEW IMAGE ) FROM FORMDATA(EDITABLEDATA) SO THAT IMG WILL BE DISSAPEARED FROM SCREEN AND ALSO CAN BE UPDATED IN MONGODB
      const updatedArray = [...prevData.Car_Image];
      if (isDeleting) {
        updatedArray[index].imgUrl = "result.url";
      } else if (isCancelUpload) {
        updatedArray[index].imgUrl = "result.url";
        updatedArray[index].imgPublic_Id = "result.public_id";
      }
      return { ...prevData, Car_Image: updatedArray };
    });
    console.log("array", editableData.Car_Image);
  };

  /////////////////////////// DELETE / Discard FUNCTION DEPENDENT ON handleDiscardImageUpload FUNCTION  /////////////////////////////////////

  useEffect(() => {
    const handleImageDelete = async () => {
      /// DELETING IMG URL FROM DB
      try {
        const carImages = editableData.Car_Image;
        const response = await axios.put(
          `${dbURL}/${finalObjectId}`,
          { carImages },
          {
            headers: { action: "singleModeImageData", operation: "Delete" },
          }
        );

        if (response.status === 200) {
          const result = await response.data;
          console.log(
            response.status,
            " MESSAGE : Image has been Deleted Successfully"
          );
          console.log(" RESPONSE:", result);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleImageRemove = async (removeActionId) => {
      /// TAKED PUBLIC ID AS PROPS AND ONLY DELETE THE IMG FROM CLOUDINARY DB
      // console.log(removeActionId);
      try {
        const response = await axios.delete(
          `${dbURL}/${finalObjectId}?public_id=${removeActionId}`
        );
        console.log(
          "Object deleted successfully:",
          response.data,
          response.publicId
        );
      } catch (err) {
        console.error("Error deleting object:", err);
      }
    };

    if (actionOnImage === "Delete" && actionOnImage !== null) {
      /// WILL EXECUTE DELETE FUNCTION IF ACTION IS SET DELETE BY handleDiscardImageUpload FUNCTION
      handleImageDelete();
      setActionOnImage(null);
      // console.log("this is for delete");
    } else if (actionOnImage !== "Delete" && actionOnImage !== null) {
      /// WILL EXECUTE DELETE FUNimgCTION FOR CLOUDINARY DB ONLY IF ACTION IS SET AS PUBLIC ID BY handleDiscardImageUpload
      handleImageRemove(actionOnImage);
      setActionOnImage(null);
    }
  }, [actionOnImage]);

  const handleImageUploadingMode = (isSingle, isMultipleModeON) => {
    /// HANDLING MODE

    if (isSingle) {
      setImageUploadingMode("Multiple");
    } else if (isMultipleModeON) {
      setImageUploadingMode("Single");
    }
  };

  const handleClearMultipleModeData = () => {
    ///////// DISCARD FUNCTION FOR MULTIPLE MODE ON SELECTED IMAGES
    setLocalImageUrlForMultipleMode([]);
    setImageForMultimodeUpload([0]);
    setIsImageUploadedFromMultiple(false);
  };

  return (
    <>
      <div className=" body w-screen h-screen relative bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 ">
        <div className="content ml-auto mr-auto flex flex-col md:flex-row border-1 border-gray-400 h-92% w-100% bg-gray-500 rounded-xl bg-opacity-30 drop-shadow-xl p-3">
          <div className="details_box w-full md:w-50% h-64 md:h-100%  border-gray-400  bg-gray-100 bg-opacity-30  rounded-xl md:mr-4 mb-2 drop-shadow-xl flex flex-col p-2 ">
            <span
              className={
                editingPanel
                  ? "flex md:mt-3  justify-center border ml-3  md:w-90% w-68% rounded-lg h-6 md:ml-8 align-middle items-center uppercase font-semibold bg-slate-400 bg-opacity-30 drop-shadow-xl tracking-widest text-xs "
                  : " flex md:mt-3  justify-center border ml-3   md:w-81% w-74% rounded-lg h-6 md:ml-8 align-middle items-center uppercase font-semibold bg-slate-400 bg-opacity-30 drop-shadow-xl tracking-widest text-xs "
              }
            >
              Car Details
              <span
                className={
                  !editingPanel
                    ? " absolute -right-10  text-green-800 flex justify-center items-center h-100%  w-4 "
                    : "hidden"
                }
                onClick={handleEnableEditing}
              >
                <button
                  type="button"
                  className="btn btn-outline-info h-6 items-center flex w-18 text-xs text-black"
                >
                  <BiEdit />
                </button>
              </span>
            </span>
            <span
              className="border flex flex-wrap mt-2 pt-2 pb-3  rounded-lg bg-white bg-opacity-50  justify-center flex-ro  w-90% ml-auto mr-auto
          gap-3 text-xss md:h-50% "
            >
              {[...Array(6)].map((_, index) => {
                return (
                  <span className=" w-40% md:mt-4 md:-mb-2" key={index}>
                    <h6 className=" uppercase tracking-widest font-semibold text-xss md:text-xs mb-1 pl-1 md:pl-1 ">
                      {fieldName[index]}
                    </h6>
                    <span className="relative">
                      <input
                        className="w-100% border rounded-md bg-opacity-40 bg-slate-100 pl-1 md:pl-1 md:h-8 h-60% text-xsss md:text-sm uppercase"
                        value={
                          editableData && Object.values(editableData)[index]
                        }
                        readOnly
                      />
                      <span
                        className={
                          editingPanel
                            ? "absolute left-0 top-0 cursor-pointer"
                            : "hidden"
                        }
                      >
                        <InputSection
                          key={index}
                          index={index}
                          handleOnChange={handleOnChange}
                          formData={editableData}
                          value={
                            editableData && Object.values(editableData)[index]
                          }
                          placeholders={placeholders}
                        />
                      </span>
                    </span>

                    <span
                      className={
                        editingPanel
                          ? " texwhtie  absolute left-48 hidden  md:h-12 md:block bottom-48  w-16  "
                          : "hidden"
                      }
                      onClick={() => handleSaveData(true, false, false)}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-info h-8 p-1 items-center flex w-16 justify-center text-xs text-black  uppercase font-semibold "
                      >
                        Update
                      </button>
                    </span>
                    <span
                      className={
                        editingPanel
                          ? " absolute left-80 hidden  md:h-12 md:block bottom-48  w-16  "
                          : "hidden "
                      }
                      onClick={handleDesableEditing}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-danger h-8 p-1 items-center flex w-16 justify-center text-xs uppercase font-semibold text-black"
                      >
                        Cancel
                      </button>
                    </span>
                  </span>
                );
              })}
            </span>
          </div>
          <div className="image_grid relative  w-full h-96%  border-1 border-gray-400 md:h-100% md:w-60% bg-gray-100 rounded-xl bg-opacity-30 drop-shadow-xl flex flex-col gap-2">
            <span className="  flex justify-center ml-auto mr-auto mt-2 w-80% rounded-lg h-6  align-middle items-center uppercase font-semibold bg-green-800 bg-opacity-30 drop-shadow-xl tracking-widest text-xs">
              Media Files
            </span>
            <div className="modeSlider h-6  rounded-xl bg-slate-500 p-1 w-19% md:w-9% border relative flex ml-auto mr-auto">
              {imgUploadingMode === "Single" ? (
                <span
                  className="singleMode border  border-black rounded-xl absolute cursor-pointer w-60% bg-white text-black h-4 text-xss active:bg-slate-500 font-semibold transition-left left-1 flex justify-center "
                  onClick={() => handleImageUploadingMode(true, false)}
                >
                  Single
                </span>
              ) : (
                <span
                  className="multipleMode border  border-black  text-black font-semibold rounded-xl cursor-pointer w-65% bg-gray-50 h-4 text-xss absolute flex justify-center transition-right right-1"
                  onClick={() => handleImageUploadingMode(false, true)}
                >
                  Multiple
                </span>
              )}



              
            </div>

            {imgUploadingMode === "Single" ? (
              <section className=" p-2  flex md:mt-1 gap-2 justify-center flex-wrap  ml-auto  mr-auto  w-98%  h-85%   ">
                {[...Array(12)].map((_, index) => (
                  <span
                    key={index}
                    className={
                      isIImageLoadedAtIndex[index] === true
                        ? "border-4 relative mt-1 border-green-400 border-solid rounded-md m-0 flex w-25% h-20% filter grayscale "
                        : "border-1 relative mt-1 border-black border-dashed rounded-md m-0 flex w-25% h-20%"
                    }
                  >
                    {index < editableData.Car_Image.length ? (
                      editableData.Car_Image[index].imgUrl !== "result.url" ? (
                        <>
                          <img
                            className="w-full h-full rounded-md"
                            src={
                              editableData.Car_Image[index].imgUrl !==
                              "result.url"
                                ? editableData.Car_Image[index].imgUrl
                                : ""
                            }
                            alt=""
                          />
                          {isIImageLoadedAtIndex[index] === true ? (
                            <span className="absolute w-3 h-3 md:w-5 md:h-5 md:text-lg text-xs text-white rounded-sm flex justify-center items-center right-1 top-1 hover:border-red-500 hover:bg-red-600 cursor-pointer hover:border-dashed active:bg-white">
                              <span
                                onClick={() =>
                                  handleDiscardImageUpload(index, false, true)
                                }
                              >
                                <MdOutlineCancel />
                              </span>
                            </span>
                          ) : (
                            <span
                              key={index}
                              className="absolute w-3 border rounded-xl h-3 md:w-5 md:h-5 md:text-lg bg-red-200 text-xs text-white  flex justify-center items-center right-1 top-1 hover:border-red-500 hover:bg-red-600 cursor-pointer hover:border-dashed active:bg-white"
                              onClick={() =>
                                handleDiscardImageUpload(index, true, false)
                              }
                            >
                              <MdDelete />
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="w-full h-full md:text-5xl text-xl text-gray-500 justify-center flex group items-center rounded-md ">
                          <input
                            onChange={(event) =>
                              handleImageUpload(event, index, false)
                            }
                            className="md:text-xs md:border h-full absolute w-full text-xl text-gray-500 justify-center flex items-center rounded-md opacity-0 cursor-pointer"
                            type="file"
                            accept="image/*"
                            multiple={false}
                            required
                            name="Car_Image"
                          />

                          <span className="cursor-pointer  group-active:text-white">
                            <AiFillFolderAdd />
                          </span>
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                ))}
                {isiImageSelected ? (
                  <div className="img_updating_btn  flex items-center justify-center w-full ">
                    <button
                      type="button"
                      className="btn btn-outline-info h-8 p-1 text-xs text-black uppercase font-semibold"
                      onClick={() => handleSaveData(false, true, false)}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </section>
            ) : (
              <section className=" p-2  flex md:mt-1 gap-2 justify-center flex-wrap  ml-auto  mr-auto  w-98%  h-85%   ">
                {[...Array(7)].map((_, index) => (
                  <span
                    key={index}
                    className={
                      isImageUploadedFromMultiple
                        ? "border-4 relative mt-1 border-white border-solid rounded-md m-0 flex w-25% h-20% filter grayscale "
                        : "border-1 relative mt-1 border-black border-dashed rounded-md m-0 flex w-25% h-20%"
                    }
                  >
                    {index === 6 ? (
                      // Display the upload button at the 7th position
                      <span className="w-full h-full md:text-5xl text-xl text-gray-500 justify-center flex group items-center rounded-md">
                        <input
                          onChange={(event) =>
                            handleImageUpload(event, null, true)
                          }
                          className="md:text-xs md:border h-full absolute w-full text-xl text-gray-500 justify-center flex items-center rounded-md opacity-0 cursor-pointer"
                          type="file"
                          accept="image/*"
                          multiple
                          required
                          name="Car_Image"
                        />
                        <span className="cursor-pointer group-active:text-white">
                          <AiFillFolderAdd />
                        </span>
                        <span className="text-lg"> Upload</span>
                      </span>
                    ) : // Display the image from localImageUrlForMultipleMode array if available
                    index < localImageUrlForMultipleMode.length ? (
                      <img
                        className="w-full h-full rounded-md"
                        src={localImageUrlForMultipleMode[index]}
                        alt=""
                      />
                    ) : index < editableData.Car_Image.length ? (
                      // Display the image from editableData.Car_Image array if available
                      editableData.Car_Image[index].imgUrl !== "result.url" ? (
                        <img
                          className="w-full h-full rounded-md"
                          src={editableData.Car_Image[index].imgUrl}
                          alt=""
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </span>
                ))}

                {isImageUploadedFromMultiple ? (
                  <div className="flex  gap-4 justify-center w-full flex-row">
                    <div className="img_updating_btn  flex items-center justify-center ">
                      <button
                        type="button"
                        className="btn btn-outline-info h-8 p-1 text-xs text-black uppercase font-semibold"
                        onClick={() => handleSaveData(false, false, true)}
                      >
                        Update
                      </button>
                    </div>
                    <div className="img_updating_btn  flex items-center justify-center ">
                      <button
                        type="button"
                        className="btn btn-outline-danger h-8 p-1 text-xs text-black uppercase font-semibold"
                        onClick={() => handleClearMultipleModeData()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </section>
            )}
          </div>

          <span
            className={
              editingPanel
                ? "  absolute left-56  md:border md:h-12  flex justify-center items-center md:hidden top-6  w-16  "
                : "hidden"
            }
            onClick={handleDesableEditing}
          >
            <button
              type="button"
              className="btn btn-outline-danger h-6 p-1 items-center flex w-18 text-xs text-black"
            >
              <MdOutlineCancelPresentation />
            </button>
          </span>
          <span
            className={
              editingPanel
                ? " md:bottom-0 md:border md:h-12  absolute left-64 text-green-800 flex justify-center items-center top-6  w-16 md:hidden "
                : "hidden"
            }
            onClick={() => handleSaveData(true, false, false)}
          >
            <button
              type="button"
              className="btn btn-outline-info h-6 p-1 items-center flex w-18 text-xs text-black"
            >
              <RiSaveLine />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleView;
