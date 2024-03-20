const express = require('express');
const route = express.Router();
const cate = require('../model/Category');
const userController = require('../src/app/controllers/userController');
const adminController = require('../src/app/controllers/adminController');



//trung gian
route.get('/adminapi',adminController.getdataapi);

route.post('/updateProduct/:Id',adminController.uploadProduct);
route.post('/deleteProduct/:Id',adminController.deleteProduct);
route.post('/updateImage/:Id',adminController.uploadImage);
route.post('/themsp',adminController.themsp);
route.get('/bildeliver/:Id',adminController.billDeliver)
route.get('/',adminController.verifyUser, adminController.getcategorys);

module.exports = route;