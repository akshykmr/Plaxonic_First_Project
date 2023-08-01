const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const entriesController = require('../controller/entriesController');
// const { CloudinaryStorage } = require('multer-storage-cloudinary'); /// THIS HELPS TO STORE THE FILE DIRECTLY IN CLOUDINARY DB AS PER STORAGE FUNCTIONALITY OF MULTER
// const cloudinary = require('cloudinary').v2;

///////////// TO STORE THE DATA IN LOCAL STORAGE ///////////////////
// app.use('/static',express.static('/tempfile')); IT IS USED TO SERVE THE FILE TO CLIENT EXPRESS FUNCTION
const storage = multer.diskStorage({
      destination: 'assets',
      filename: function (req, file, cb) {
        cb(null, Date.now()+'  '+ file.originalname)
      }
    });
    const upload = multer({storage:storage}); 
    upload.none();
///SPECIFYING PATH TO UPLOAD THE FILE

//////////////////////////// IT WILL ONLY STORE THE IMAGE IN MEMORY NOT IN LOCAL STORAGE //////////////////////////
    // const upload = multer({
    //     storage: multer.memoryStorage(),
    //     limits: {
    //       fileSize: 1024 * 1024 * 10, // to Limits file size to 10MB
    //     }});

    //////////////////////////// USING STORAGE ENGINE TO STORE THE FILE DIRECTLY IN CLOUDINARY STORAGE ///////////////////////////
    // const storage = new CloudinaryStorage({  /// WITH THIS THE FILE IS DIRECTLY STORING IN CLOUDINARY DB 
    //     cloudinary: cloudinary,   
    //     params: {
    //       resource_type: 'auto',
    //       format: async (req, file) => 'png',
    //     },
    //   });
// const upload = multer({ storage: storage }); /// SPECIFYING PATH TO UPLOAD THE FILE


// const upload = multer(); /// HANDLING FILE WITHOUT STORING IT : FILE WILL STAY IN DISK MEMORY AS BUFFER


// GET API
router.get('/entries', entriesController.getEntries);
router.get('/entries/:id', entriesController.getSingleObject);

// POST API
router.post('/entries', upload.array('Car_Image',12), entriesController.createEntry);  /// IN CASE OF SINGLE IMG .ARRAY CAN BE CHANGE WITH .SINGLE AND NEED TO REMOVE QUANTITY OF FILE 

// DELETION API
router.delete('/entries/:id', entriesController.deleteEntry);

/// UPDATION API
router.put('/entries/:id', upload.array('Car_Image',6), entriesController.updatedObject);

  
module.exports = router;
