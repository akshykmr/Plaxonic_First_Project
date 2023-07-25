require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const Entry = require('../models/inputDataSchema');
// const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COUND_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET API
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
    console.log("Total entries are =", entries.length);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleObject = async (req, res) => {
  try {
    let objectId;
    (() => {
      if (typeof req.params.id === 'string') {
        objectId = req.params.id.replace(/"/g, '')  ;
      } else {
        objectId = req.params.id;
      }
    })(); 
    // console.log('Received object ID:', typeof(objectId));
    const data = await Entry.findById(objectId);
    res.json(data);
    // console.log("requested id is ", res,data);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEntryCount = async (req, res) => {
  try {
    const count = await Entry.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// POST API
const createEntry = async (req, res) => {
  try {
    const imageFiles = req.files.Car_Image;
    console.log(req.files.Car_Image,"this is image array")
    const imageFilesUrl = [];
    if (Array.isArray(imageFiles)) {
      for (let i = 0; i < 12; i++) {
        if(i < imageFiles.length){
          const image = imageFiles[i];
          const result = await cloudinary.uploader.upload(image.tempFilePath);
          imageFilesUrl.push({
            imgUrl: result.url,
            imgPublic_Id: result.public_id,
          });
        }
        else{
          imageFilesUrl.push({
            imgUrl: "result.url",
            imgPublic_Id: "result.public_id",
          });
        }
        // console.log("single img url", result);
      }
    } else {
      for (let i = 0; i < 12; i++) {
        if(i<1){
          const result = await cloudinary.uploader.upload(imageFiles.tempFilePath);
          imageFilesUrl.push({
            imgUrl: result.url,
            imgPublic_Id: result.public_id,
          });
        }
        else{
          imageFilesUrl.push({
            imgUrl: "result.url",
            imgPublic_Id: "result.public_id",
          });
        }
      }
      
      // console.log("single img url", result);
    }
    console.log("This is image data", imageFilesUrl);
    const entry = new Entry({
      Car_Name: req.body.Car_Name,
      Car_Modal: req.body.Car_Modal,
      Purchase_Year: req.body.Purchase_Year,
      Transmission: req.body.Transmission,
      Fuel_Type: req.body.Fuel_Type,
      Car_Image: imageFilesUrl,
    });
    entry.save()
      .then((newEntry) => {
        // console.log("New Entry Created", newEntry);
        res.status(201).json(newEntry);
      })
      .catch((error) => {
        console.error('Error Creating Entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// DELETION API
const deleteEntry = async (req, res) => {
  try {
    const objectId = req.params.id;
    const publicIdforCloudinaryDelete = req.query.public_id;
    const objectImageData = req.body.objectImageDetails;

    if(publicIdforCloudinaryDelete){
      console.log("Deleted Items is ", publicIdforCloudinaryDelete);
      await cloudinary.uploader.destroy(publicIdforCloudinaryDelete);
    } else if(objectImageData){
      console.log("this is for whole object", objectImageData);
      const imgPublic_Id_array = [];
      if (Array.isArray(objectImageData)) {
        for (let i = 0; i < objectImageData.length; i++) {
          const public_id = objectImageData[i].imgPublic_Id;
          imgPublic_Id_array.push(public_id);
        }
      }
      console.log("array for deleting items", imgPublic_Id_array);
      await Entry.deleteOne({ _id: objectId });
      for (let i = 0; i < imgPublic_Id_array.length; i++) {
        await cloudinary.uploader.destroy(imgPublic_Id_array[i]);
      }
      res.status(200).json({ message: 'Object deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting object:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/// UPDATION API 

const updatedObject = async (req, res) => {
  try {
    objectId = req.params.id;
    const imageArrayrRecieved = req.body.body;
    const formdata = req.body;
    if (imageArrayrRecieved) {
     const jsonData = JSON.parse(imageArrayrRecieved);
      for(let i =0; i < jsonData.length; i++){
        if(jsonData[i].imgUrl === "result.url" && jsonData[i].imgPublic_Id !== "result.public_id" ){
          let idForCloudinaryDelete = jsonData[i].imgPublic_Id;
          await cloudinary.uploader.destroy(idForCloudinaryDelete);
          console.log("Deleted Image from cloudinary",idForCloudinaryDelete );
        }
      };
      const updatedEntry = await Entry.findById(objectId);
      updatedEntry.Car_Image = jsonData;
      await updatedEntry.save();
      res.json(updatedEntry);
    } else if (formdata) {
      console.log(formdata, "this is Upadated Data");
      const data = await Entry.findById(objectId);
      data.Car_Name = formdata.Car_Name;
      data.Car_Modal = formdata.Car_Modal;
      data.Purchase_Year = formdata.Purchase_Year;
      data.Transmission = formdata.Transmission;
      data.Fuel_Type = formdata.Fuel_Type;
      await data.save();
      res.json(data);
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

    module.exports = {
    getEntries,
    getSingleObject,
    getEntryCount,
    createEntry,
    deleteEntry,
    updatedObject,
    };
