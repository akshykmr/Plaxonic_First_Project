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
  const [isiImageUploaded, setIsImageUploaded] = React.useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [isiImageSelected, setIsImageSelected] = useState(false);
  const [productId] = useState(() => localStorage.getItem("productId"));
  const [url, setUrl] = useState();
  const [editableData, setEditableData] = useState({
    Car_Name: "",
    Car_Modal: "",
    Purchase_Year: "",
    Transmission: "",
    Fuel_Type: "",
    Total_Images: "",
    Car_Image: [],
  });
  const [editingPanel, setEditingPanel] = useState(false);
  const [imageAction, setImageAction] = useState(0);
  const [imgUploadingMode, setImageUploadingMode] = useState("Single");
  const [localImageUrl, setLocalImageUrl] = useState([]);
  const [imageForMultimodeUpload, setImageForMultimodeUpload] = useState([]);
  const [isImageUploadedFromMultiple, setIsImageUploadedFromMultiple] =
    useState(false);

  useEffect(() => {
    if (inputData) {
      setUrl(inputData);
      localStorage.setItem("productId", inputData);
    } else {
      setUrl(productId);
    }
  }, [inputData, productId]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!url) {
          return;
        }
        const response = await axios.get(`${dbURL}/${url}`);
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
  }, [url]);

  useEffect(()=>{
    if(imageForMultimodeUpload.length>0){
      console.log("==",imageForMultimodeUpload);
    }
  },[imageForMultimodeUpload]);


  // useEffect(() => {
  //   if (localImageUrl.length > 0) 
  //   console.log("img array", localImageUrl);
  //   setIsImageUploadedFromMultiple(true);
  // }, [localImageUrl]); //// CHECKING MULTIPLE IMAGE ONLOAD AND STORE FUNCTION

  const handleImageUpload = async (event, index, isMultiple) => {
    if (isMultiple) {

      const files = event.target.files;

      const imageDataURLs = [];
      const imageDataFiles = []
      for (let i = 0; i < files.length && i < 6; i++) {
        const file = files[i];
        imageDataFiles.push(files[i]);
        const reader = new FileReader();
        reader.onload = () => {
          imageDataURLs.push(reader.result);
          if (imageDataURLs.length === Math.min(files.length, 6)) {
            setLocalImageUrl(imageDataURLs);
          }
        };
        reader.readAsDataURL(file);
      }
      console.log("=",imageDataFiles)
      setImageForMultimodeUpload(imageDataFiles);        
    setIsImageUploadedFromMultiple(true);
    } else {
      const file = event.target.files[0];
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pot2cderdddddd");
        formData.append("cloud_name", "dsk9g1uuo");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dsk9g1uuo/image/upload`,
          {
            method: "POST",
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
          const updatedArray = [...prevData.Car_Image];
          updatedArray[index] = imagePacket;
          return { ...prevData, Car_Image: updatedArray };
        });
        setIsImageUploaded((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = 2;
          return updatedData;
        });
        console.log("Image URL:", result.url);
      } catch (error) {
        console.error("Error:", error);
      }
      setIsImageSelected(true);
    }
  };

  const handleSaveData = async (textformSubmit, singleModeImageSubmit, multipleModeImageSubmit ) => {
    setEditingPanel(false);
    if (textformSubmit) {
      try {
        const updatedFormData = new FormData();
        updatedFormData.append("Car_Name", editableData.Car_Name);
        updatedFormData.append("Car_Modal", editableData.Car_Modal);
        updatedFormData.append("Purchase_Year", editableData.Purchase_Year);
        updatedFormData.append("Transmission", editableData.Transmission);
        updatedFormData.append("Fuel_Type", editableData.Fuel_Type);

        const response = await axios.put(`${dbURL}/${url}`, updatedFormData);

        console.log(updatedFormData, "this is formdata");

        if (response.status === 200) {
          const result = await response.data;
          console.log(" this is submitted Response:", result);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (singleModeImageSubmit) {
      setIsImageSelected(false);
      setIsImageUploaded(2);
      try {
        const response = await axios.put(`${dbURL}/${url}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editableData.Car_Image),
        });

        if (response.status === 200) {
          const result = await response.data;
          console.log("this is submitted Response:", result);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    else if(multipleModeImageSubmit){
      console.log(multipleModeImageSubmit);
    }
  };

  const handleClosePanel = () => {
    setEditingPanel(false);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setEditableData((prevalue) => ({ ...editableData, [name]: value }));
  };

  const handleEnableEditing = () => {
    setEditingPanel(true);
  };

  const placeholders = {
    0: "Enter Your car Name",
    1: "Enter Your car Model",
    2: "Enter the Purchase date",
    3: "Enter the Transmission Type",
    4: "Enter Fuel Type",
  };

  useEffect(() => {
    const handleImageDelete = async () => {
      try {
        const response = await axios.put(`${dbURL}/${url}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editableData.Car_Image),
        });

        if (response.status === 200) {
          const result = await response.data;
          console.log("this is submitted Response:", result);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleImageRemove = async (removeActionId) => {
      console.log(removeActionId);
      try {
        const response = await axios.delete(
          `${dbURL}/${url}?public_id=${removeActionId}`
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

    if (imageAction === "Delete") {
      handleImageDelete();
      setImageAction(0);
      console.log("this is for delete");
    } else if (imageAction !== "Delete" && imageAction !== 0) {
      handleImageRemove(imageAction);
      setImageAction(0);
    }
  }, [imageAction]);

  useEffect(()=>{
    if(isiImageUploaded){
      console.log("state of img", isiImageUploaded);
    const allZero = isiImageUploaded.every((value) => value === 0);
  if (allZero) {
    setIsImageSelected(false);
    console.log(isiImageSelected);
    } else{
    setIsImageSelected(true);
    }
  }
      console.log("isiImageUploaded:", isiImageUploaded);

  },[imageAction]);

  const handleDescardImageUpload = async (
    index,
    isDeleting,
    isCancelUpload
  ) => {
    if (isDeleting) {
      setImageAction("Delete");
    } else if (isCancelUpload) {
      setImageAction(editableData.Car_Image[index].imgPublic_Id);
      setIsImageUploaded((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = 0;
        return updatedData;
      });
    }
     const publicId = editableData.Car_Image[index].imgPublic_Id;
    setEditableData((prevData) => {
      const updatedArray = [...prevData.Car_Image];
      updatedArray[index].imgUrl = "result.url"; // Make sure to use the correct value for imgUrl
      return { ...prevData, Car_Image: updatedArray };
    });
    console.log(publicId, "This is image id for selection");
    console.log(editableData.Car_Image, "This is image id for selection");
  };

  const handleImageUploadingMode = (isSingle, isMultiple) => {
    if (isSingle) {
      setImageUploadingMode("Multiple");
    } else if (isMultiple) {
      setImageUploadingMode("Single");
    }
  };

  const handleClearMultipleImage = () => {
    setLocalImageUrl([]);
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
                          ? "  absolute left-48 hidden  md:h-12 md:block bottom-48  w-16  "
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
                      onClick={handleClosePanel}
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
            <div className="modeSlider h-6  rounded-xl bg-slate-500 p-1 w-9% border relative flex ml-auto mr-auto">
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
                    className={ isiImageUploaded[index] === 2 ? "border-4 relative mt-1 border-green-400 border-solid rounded-md m-0 flex w-30% h-20% filter grayscale " : "border-1 relative mt-1 border-black border-dashed rounded-md m-0 flex w-30% h-20%" }
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
                          {isiImageUploaded[index] === 2 ? (
                            <span className="absolute w-3 h-3 md:w-5 md:h-5 md:text-lg text-xs text-white rounded-sm flex justify-center items-center right-1 top-1 hover:border-red-500 hover:bg-red-600 cursor-pointer hover:border-dashed active:bg-white">
                              <span
                                onClick={() =>
                                  handleDescardImageUpload(index, false, true)
                                }
                              >
                                <MdOutlineCancel />
                              </span>
                            </span>
                          ) : (
                            <span
                              key={index}
                              className="absolute w-3 h-3 md:w-5 md:h-5 md:text-lg text-xs text-white rounded-sm flex justify-center items-center right-1 top-1 hover:border-red-500 hover:bg-red-600 cursor-pointer hover:border-dashed active:bg-white"
                              onClick={() =>
                                handleDescardImageUpload(index, true, false)
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
                    className={isImageUploadedFromMultiple ? "border-4 relative mt-1 border-white border-solid rounded-md m-0 flex w-30% h-20% filter grayscale " : "border-1 relative mt-1 border-black border-dashed rounded-md m-0 flex w-30% h-20%"}
                  >
                    {index < localImageUrl.length ? (
                      // Display the image from localImageUrl array if available
                      <img
                        className="w-full h-full rounded-md"
                        src={localImageUrl[index]}
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
                      ) : index === 6 ? (
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
                      ) : ""
                    ) : (
                      ""
                    )}
                  </span>
                ))}
                 {isImageUploadedFromMultiple ? ( <div className="flex  gap-4 justify-center w-full flex-row">
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
                  onClick={() => handleClearMultipleImage()}
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
            onClick={handleClosePanel}
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
            onClick={() => handleSaveData(true, false,false)}
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
