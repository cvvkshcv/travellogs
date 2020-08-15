const express = require('express');
const router = express.Router();

const LogsModel = require('../model/logsEntry');

router.get('/', async(req, res, next) => {
    try {
        const entries = await LogsModel.find({ _id : req.query.id});
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try {
        const logEntry = new LogsModel(req.body);
        const newEntry = await logEntry.save();
        res.json(newEntry);
    } catch (error) {
        if (error.name == 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

module.exports  = router;