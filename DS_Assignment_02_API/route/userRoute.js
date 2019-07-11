const userController = require('../controller/userController');
const express = require('express');
var router = express.Router();

router.route('/add').post((req, res) =>{
    userController.addData(req.body).then((data) => {
        res.status(200).send({message: data.message});
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

router.route('/login/:email/:password').get((req, res) => {
    userController.getUser(req.params.email, req.params.password).then((data) => {
        res.status(200).send(data.data);
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

router.route('/check/:email').get((req, res) => {
    userController.checkEmail(req.params.email).then((data) => {
        res.status(200).send(data.data);
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

module.exports = router;