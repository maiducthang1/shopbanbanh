const express = require('express');
const route = express.Router();
const cate = require('../model/Category');
const userController = require('../src/app/controllers/userController');



const { response } = require('express');

route.post('/',userController.loginSuccess);
route.post('/api',userController.loginSuccessapi);
route.get('/',userController.getLogin);
route.get('/logout',userController.Logout);
route.post('/registerApi',userController.registerSuccessApi);
route.post('/register',userController.registerSuccess);
route.get('/register',userController.register);

route.get('/thongtincanhan/api',userController.userDetailApi);
route.get('/thongtincanhan',userController.userDetails);

route.put('/updateUserApi',userController.updateUserApi);
route.post('/changedetail',userController.changeSuccess);

route.post('/giohang/huhu/:Id',userController.addacartapi);
route.post('/giohang/huhi/:Id',userController.addcartapi);
route.post('/giohang/:Id',userController.cart);

route.get('/sanpham/huhu/:Id',userController.productdetail);
// route.post('/giohang/huhu/:Id',userController.addcart);
route.post('/file',userController.uploadfile);
route.get('/fi',userController.pfile);

route.get('/delete/giohang/:Id',userController.deletecartitem);
route.get('/giohang/api',userController.cartapi);
route.get('/giohang',userController.cart);

route.post('/newcartApi',userController.newcartapi);
route.post('/newcart',userController.newcart);

route.get('/bill/api',userController.billapi);
route.get('/billdetailapi/:Id',userController.billdetailapi);
route.get('/billdetail/:Id',userController.billdetail);
route.put('/billconfirmapi/:Id',userController.billconfirmapi);
route.get('/billconfirm/:Id',userController.billconfirm);
route.put('/billcancelapi/:Id',userController.billcancelmapi);
route.get('/billcancel/:Id',userController.billcancel);
route.get('/hoadon',userController.bill);

module.exports = route;
