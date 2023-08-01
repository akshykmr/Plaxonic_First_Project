require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Entry = require("../models/inputDataSchema");
const fs = require("fs");

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
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleObject = async (req, res) => {
  try {
    let objectId;
    (() => {
      if (typeof req.params.id === "string") {
        objectId = req.params.id.replace(/"/g, "");
      } else {
        objectId = req.params.id;
      }
    })();
    // console.log('Received object ID:', typeof(objectId));
    const data = await Entry.findById(objectId);
    res.json(data);
    // console.log("requested id is ", res,data);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET API FOR RESPONSE COUNT
const getEntryCount = async (req, res) => {
  try {
    const re = req.body;
    console.log("req is ",re);
    const count = await Entry.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST API
const createEntry = async (req, res) => {
  try {
    const imageFiles = req.files;
    const imageFilesUrl = [];
    const imagePathArray = [];
    /////////////////// UPLOADING ON CLODINARY /////////////
    if (Array.isArray(imageFiles)) {
      for (let i = 0; i < 12; i++) {
        if (i < imageFiles.length || i === 0) {
          const image = imageFiles[i];
          const imagePath = image.path;
          const result = await cloudinary.uploader.upload(imagePath);
          imageFilesUrl.push({
            imgUrl: result.url,
            imgPublic_Id: result.public_id,
          });
          imagePathArray.push(imagePath);
        } else {
          imageFilesUrl.push({
            imgUrl: "result.url",
            imgPublic_Id: "result.public_id",
          });
        }
      }
    }
    /////////////////////////// CREATING NEW ENTRY IN MONGODB///////////////
    const entry = new Entry({
      Car_Name: req.body.Car_Name,
      Car_Modal: req.body.Car_Modal,
      Purchase_Year: req.body.Purchase_Year,
      Transmission: req.body.Transmission,
      Fuel_Type: req.body.Fuel_Type,
      Car_Image: imageFilesUrl,
    });

    entry
      .save()
      ///////////////////////// DELETING TEMPORARY IMAGE FROM LOCAL STORAGE
      .then((newEntry) => {
        // Entry is successfully saved in the database.
        // Send the response with status 201 and the newEntry data.
        
        res.status(201).json(newEntry);

        // Now, deleting the temporary files to clean local storage ).
        if (Array.isArray(imagePathArray)) {
          for (let i = 0; i < imagePathArray.length; i++) {
            const path = imagePathArray[i];
            fs.unlink(path, (err) => {
              if (err) {
                console.error("Error deleting temporary file:", err);
              } else {
                console.log("Temporary file deleted successfully:", path);
              }
            });
          }
        }
      })
      .catch((err) => {
        console.error("Error saving entry:", err);
        res.status(500).json({ error: "Error saving entry" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETION API
const deleteEntry = async (req, res) => {
  try {
    const objectId = req.params.id;
    const publicIdforCloudinaryDelete = req.query.public_id;
    const objectImageData = req.body.objectImageDetails;

    if (publicIdforCloudinaryDelete) {
      console.log("Deleted Items is ", publicIdforCloudinaryDelete);
      await cloudinary.uploader.destroy(publicIdforCloudinaryDelete);
    } else if (objectImageData) {
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
      res.status(200).json({ message: "Object deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting object:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/// UPDATION API

const updatedObject = async (req, res) => {
  try {
    const datatype = req.headers.action;
    const textformData = req.body;
    const multipleModeImageData = req.files;
    const objectId = req.params.id;
    const operation = req.headers.operation;

    //////////////////// HANDLING ONLY TEXT DATA ////////////
    if (datatype === "textformData") {
      const dataInDB = await Entry.findById(objectId);
      dataInDB.Car_Name = textformData.Car_Name;
      dataInDB.Car_Modal = textformData.Car_Modal;
      dataInDB.Purchase_Year = textformData.Purchase_Year;
      dataInDB.Transmission = textformData.Transmission;
      dataInDB.Fuel_Type = textformData.Fuel_Type;
      await dataInDB.save();
      res.status(200, "SUCCESS").json(dataInDB);
      console.log("UPDATED DB-TEXT DATA  :", dataInDB);

      //////////////////// HANDLING ALREADY UPDATED CAR_IMAGE ARRYA WITH CLODINARY URL AND JUST SAVING ARRAY IN DB  ////////////
    }else if (datatype === "singleModeImageData") { // HERE THIS FUNCTION IS USING FOR TWO OPERATION UPDATION AND DELETE 
      const singleModeImageData = req.body.carImages;
      if (operation === "Delete") { // WILL DELETE THE IMAGE FROM CLOUDINARY AND THEN WILL UPDATE THE DATA IN MONGODB 
        for (let i = 0; i < singleModeImageData.length; i++) {
          if (singleModeImageData[i].imgUrl === "result.url" && singleModeImageData[i].imgPublic_Id !== "result.public_id") {
            let publicIdToDeleteCloudinaryImage = singleModeImageData[i].imgPublic_Id;
            await cloudinary.uploader.destroy(publicIdToDeleteCloudinaryImage);
            console.log("Success:", "This", singleModeImageData[i].imgPublic_Id, "Image Has Been Deleted from Cloudinary DB ");
            singleModeImageData[i].imgPublic_Id = "result.public_id";
          }
        }
        // After deleting images from Cloudinary, update the data in MongoDB
        const dataInDB = await Entry.findById(objectId);
        dataInDB.Car_Image = singleModeImageData;
        await dataInDB.save();
        console.log("IMAGE HAS BEEN DELETED SUCCESSFULLY :", dataInDB);
        // Send the response to the client
        res.status(200).json(dataInDB);
      } else { /// THIS FUNCTION WILL UPDATE THE NEW DATA IN MONGODB ONLY AS DATA HAS NEW IMAGE IN REQ
    
        const dataInDB = await Entry.findById(objectId);
        dataInDB.Car_Image = singleModeImageData;
        await dataInDB.save();
        console.log("UPDATED DB_CAR_IMAGE ARRAY :", dataInDB);
        // Send the response to the client
        res.status(200).json(dataInDB);
      }
    }    
    //////////////////// HANDLING REQ MADE FROM MULTI MODE WITH MULTIPLE IMAGE NEED TO STORE IN CLOUDINARY THEN IN DB ////////////
    else if (datatype === "multipleModeImageData") {
      const imageFilesUrl = [];
      const imagePathArray = [];
      if (Array.isArray(multipleModeImageData)) {
        for (let i = 0; i < multipleModeImageData.length; i++) {
          if (i < multipleModeImageData.length || i === 0) {
            const image = multipleModeImageData[i];
            const imagePath = image.path;
            const result = await cloudinary.uploader.upload(imagePath);
            imageFilesUrl.push({
              imgUrl: result.url,
              imgPublic_Id: result.public_id,
            });
            imagePathArray.push(imagePath);
          }
        }
      }
      const dataInDB = await Entry.findById(objectId);
      for (let i = 0; i < imageFilesUrl.length; i++) {
        dataInDB.Car_Image[i] = imageFilesUrl[i];
      }
      await dataInDB
        .save()
        .then((newDataInDB) => {
          res.status(200, "SUCCESS").json(newDataInDB);
          ///////////////////// DELETING TEMP FILE FROM LOCAL STORAGE
          if (Array.isArray(imagePathArray)) {
            for (let i = 0; i < imagePathArray.length; i++) {
              const path = imagePathArray[i];
              fs.unlink(path, (err) => {
                if (err) {
                  console.error("Error deleting temporary file:", err);
                } else {
                  console.log("Temporary file deleted successfully:", path);
                }
              });
            }
          }
        })
        .catch((err) => {
          console.error("Error saving entry:", err);
          res.status(500).json({ error: "Error saving entry" });
        });

      console.log("UPDATED DBDATA AFTER CLODINARY UPDATION", dataInDB);
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
