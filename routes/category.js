const express = require('express');
const route = express.Router();
const categoryController = require('../src/app/controllers/categoryController');
const multipleUploadController = require('../src/app/controllers/multipleUploadController');
const userController = require('../src/app/controllers/userController');
// const { response } = require('express');


// login
// route.get('/login', categoryController.dangnhap);
// route.post('/login', categoryController.login);


//CRUD category
route.get('/search/:Id',categoryController.searchcategory);
route.post('/add', categoryController.addcategory);
route.put('/update', categoryController.updatecategory);
route.get('/get/:Id',categoryController.getcategory);
route.get('/deletee/category/:Id',categoryController.deletecategory);
// route.get('/home', categoryController.getHome);


route.get('/about',categoryController.gioithieu);
route.get('/menu',categoryController.meanu);
route.post('/multipleUpload/:Id', multipleUploadController.multipleUpload);
//trung gian
route.get('/productapi',categoryController.getproductapi);

//start
route.get('/api',categoryController.gethomeapi);
route.get('/',userController.verifyToken, categoryController.getcategorys);



module.exports = route;