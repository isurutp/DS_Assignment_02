const paymentController = require('../controller/paymentController');
const express = require('express');
var router = express.Router();

router.post('/payment', (req, res) => {
    paymentController.add(req.body).then((data) => {
        res.status(200).send({message: data.message});
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

module.exports = router;