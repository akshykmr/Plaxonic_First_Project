const express = require('express');
const router = express.Router();
const entriesController = require('../controller/entriesController');

// GET API
router.get('/entries', entriesController.getEntries);

router.get('/entries/count', entriesController.getEntryCount);

// POST API
router.post('/entries', entriesController.createEntry);

// DELETION API
router.delete('/entries/:id', entriesController.deleteEntry);

module.exports = router;
