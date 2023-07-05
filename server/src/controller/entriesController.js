require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const Entry = require('../models/inputDataSchema');

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
    const file = req.files.Car_Image;

    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      const entry = new Entry({
        Car_Name: req.body.Car_Name,
        Car_Modal: req.body.Car_Modal,
        Purchase_Year: req.body.Purchase_Year,
        Transmission: req.body.Transmission,
        Fuel_Type: req.body.Fuel_Type,
        Car_Image: result.url,
      });

      entry.save()
        .then((newEntry) => {
          console.log("New Entry Created", newEntry);
          res.status(201).json(newEntry);
        })
        .catch((error) => {
          console.error('Error Creating Entry:',
          error);
res.status(500).json({ error: 'Internal Server Error' });
});
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
await Entry.deleteOne({ _id: objectId });

res.status(200).json({ message: 'Object deleted successfully' });
} catch (error) {
    console.error('Error deleting object:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
    };
    
    module.exports = {
    getEntries,
    getEntryCount,
    createEntry,
    deleteEntry,
    };
