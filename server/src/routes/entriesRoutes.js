const express = require('express');
const router = express.Router();
const entriesController = require('../controller/entriesController');

// GET API
router.get('/entries', entriesController.getEntries);
router.get('/entries/:id', entriesController.getSingleObject);
router.get('/entries/count', entriesController.getEntryCount);

// POST API
router.post('/entries', entriesController.createEntry);

// DELETION API
router.delete('/entries/:id', entriesController.deleteEntry);

/// UPDATION API
router.put('/entries/:id', entriesController.updatedObject);

module.exports = router;
