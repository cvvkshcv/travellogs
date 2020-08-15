const express = require('express');
const router = express.Router();

const LogsModel = require('../model/logsEntry');

router.get('/', async(req, res, next) => {
    try {
        const query = (req.query.id) ? { _id: req.query.id } : {};
        const entries = await LogsModel.find(query, {hidden: 0});
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try {
        const logEntry = new LogsModel(req.body);
        const newEntry = await logEntry.save();
        res.json({
            message: 'Added',
            success: true
        });
    } catch (error) {
        if (error.name == 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

module.exports  = router;