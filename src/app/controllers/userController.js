const express = require('express');
const app = express();
const dboperations = require('../../../dboperations/dpop_user'); 
const body = require('body-parser');
const { json } = require('body-parser');
// var session = require('express-session');
var {createJWT, verifyJWT} = require('../../../middleware/JWTeff');
const bcrypt = require('bcrypt');
const dpop_user = require('../../../dboperations/dpop_user');
const { default: axios } = require('axios');
const link = "http://localhost:3000"
app.use(body.urlencoded({extended: true}));
app.use(body.json());
var admin = require('../../../helper')
var FCM = require('fcm-node')  
const serverKey = 'AAAAN5yQ9IE:APA91bE_3pmyki_N_VnZrs9C3mRbMhgkpVNr3kuvZ0TxJmAQaULbaaAtVzbh9wRv7H7G8YwGayQHrUDruE0QIWT6CvYQBbLiI_FAVSuS1_tXsHAZoHr3X0gZZ_a-lwXdohD01C4ZBC2V'; 
class user {
    getLogin(req, res, next){   
        // res.cookie('sites', 'anonystick.com'); 


        res.render('login');
    }
    Logout(req, res, next){ 
        req.session.destroy();
        res.clearCookie("user");
        res.clearCookie("thag");                                                                                    
        res.redirect("/");         
        // res.json('logout ok');     
    }   
    loginSuccessapi(req, res, next){
        var user = req.body.user;
        var password = req.body.password;
        // console.log(req.body);
        dboperations.checkLogin(user,password).then(result=>{  
            res.status(200).send({result})
        })   
    }
    loginSuccess(req, res, next){ 
        // let user = req.body.username;
        // let password = req.body.password;
        // console.log(user);
        // console.log(password);
        
        axios.post(`${link}/api`,{user:req.body.username,password:req.body.password})
        .then(function (response){
            let user = req.body.username;
            let result = response.data.result;
            if(result[0].length > 0)
                {
                    
                    res.cookie('user',result[1]);
                    // req.session.user = result;
                    // dboperations.setCookie(req, 'username',user,1);
                    // console.log(setCookie(req, 'username',user,1));
                    // dboperations.setCookie(req, 'password',password,1);
                    if(result[0][0].Id_role==1)
                        res.redirect("/CakeShop");
                    else
                        res.redirect("/admin");
                }
                else{
                    res.send("loi")
                }
        })
        .catch(function (error) {
            console.log(error);
        });    
    }
    register(req, res, next){                                                                                     
        res.render('register');        
    }
    userDetailApi(req, res, next){ 
        var token=verifyJWT(req.headers.token);
        
        dboperations.getUser(token.name).then(result=>{
            res.status(200).send({result,token});
        })    
    }
    userDetails(req, res, next){
        axios.get(`${link}/thongtincanhan/api`,{headers:{token:req.cookies.user}})
        .then(function (response){    
            let token = response.data.token;
            var username=[{thang : token.name}];
            let result = response.data.result;
            
            res.render('userDetails',{result,username});
        })
        .catch(function (error){
            console.log(error)
        })  
    }
    
    cart(req, res, next){
        axios.get(`${link}/giohang/api`,{headers:{token:req.cookies.user}})
        .then(function (response){    
            let token = response.data.token;
            var username=[{thang : token.name}];
            let result = response.data.result;

            res.render('cart',{result,username});
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    

    
    
    cartapi(req, res, next){
        
        var token=verifyJWT(req.headers.token);
        dboperations.getcart(token.name).then(result=>{
            res.status(200).send({result,token});
        })    
    }
    addcart(req, res){
        var token=verifyJWT(req.cookies.user);
        dboperations.addcart(token.name,req.params.Id).then(result=>{
            res.redirect("/giohang");
        })
    }
    addcartapi(req, res, next){
        
        var token=verifyJWT(req.body.token);
        
        dboperations.addcart(token.name,req.params.Id).then(result=>{
            res.status(200).send({result});
        })    
    }
    addacartapi(req, res, next){
        let id = req.params.Id;
        
        axios.post(`${link}/giohang/huhi/${id}`,{token:req.cookies.user},{headers:{token:req.cookies.user}})
        .then(function (response){    
            let result = response.data.result;
            // console.log(result);
            if(result==true)
            res.redirect('/giohang');
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    productdetail(req, res){
        dboperations.product(req.params.Id).then(result=>{
            res.status(200).send({result});
        })
    }

    deletecartitem(req, res){
        dboperations.deletecart(req.params.Id).then(result=>{
           
            res.redirect("/giohang");
        })
    }
    newcartapi(req, res){
        var token=verifyJWT(req.headers.token);
        console.log(req.headers);
        dboperations.savetobill(token.name).then(result=>{
            res.status(200).send({result});
        })
    }
    newcart(req, res){
        axios.post(`${link}/newcartApi`,{token:req.cookies.user},{headers:{token:req.cookies.user}})
        .then(function (response){    
            let result = response.data.result;
            if(result==true)
            res.redirect('/giohang');
        })
        .catch(function (error){
            console.log(error)
        }) 
    }
    // newcart(req, res){
    //     var token=verifyJWT(req.cookies.user);
    //     dboperations.savetobill(token.name).then(result=>{
    //         res.redirect("/giohang");
    //     })
    // }
    billapi(req, res, next){
        var token=verifyJWT(req.headers.token);
        dboperations.getbill(token.name).then(result=>{
            
            res.status(200).send({result,token});
        })    
    }
    bill(req, res, next){
        axios.get(`${link}/bill/api`,{headers:{token:req.cookies.user}})
        .then(function (response){    
            let token = response.data.token;
            var username=[{thang : token.name}];
            let result = response.data.result;
            // console.log(result);
            res.render('bill',{result,username});
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    billdetailapi(req, res, next){
        let id = req.params.Id;
        dboperations.getbilldetail(id).then(result=>{
            res.status(200).send({result});
        })    
    }
    billdetail(req, res, next){
        let id = req.params.Id;
        axios.get(`${link}/billdetailapi/${id}`,)
        .then(function (response){    
            let result = response.data.result;
            // console.log(result);
            res.render('billDetail',{result});
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    billconfirmapi(req, res, next){
        let id = req.params.Id;
        dboperations.confirmbill(id).then(result=>{
            res.status(200).send({result});
        })    
    }
    billconfirm(req, res, next){
        let id = req.params.Id;
        axios.put(`${link}/billconfirmapi/${id}`,)
        .then(function (response){    
            
            res.redirect('/giohang');
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    billcancelmapi(req, res, next){
        let id = req.params.Id;
        dboperations.cancelbill(id).then(result=>{
            res.status(200).send({result});
        })    
    }
    billcancel(req, res, next){
        let id = req.params.Id;
        axios.put(`${link}/billcancelapi/${id}`,)
        .then(function (response){    
            
            res.redirect('/hoadon');
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    registerSuccessApi(req, res, next){
        let user = req.body.username;
        let password = req.body.password;
        let address = req.body.address;
        let name = req.body.name;
        let sex = req.body.sex;
        let phone = req.body.phone;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        dboperations.addUser(user,hash,address,name,sex,phone).then(result=>{
            res.status(200).send({result});
        })    
    }
    registerSuccess(req, res, next){
        let username = req.body.username;
        let password = req.body.password;
        let address = req.body.address;
        let name = req.body.name;
        let sex = req.body.sex;
        let phone = req.body.phone;
        axios.post(`${link}/registerApi`,{username,password,address,name,sex,phone})
        .then(function (response){    
            let result = response.data.result;
            if(result == true)
            {
                res.redirect("/");
            }
            else{
                res.send('loi');
            }
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    // registerSuccess(req, res, next){ 
    //     let user = req.body.username;
    //     let password = req.body.password;
    //     let address = req.body.address;
    //     let name = req.body.name;
    //     let sex = req.body.sex;
    //     let phone = req.body.phone;
    //     var salt = bcrypt.genSaltSync(10);
    //     var hash = bcrypt.hashSync(password, salt);
    //     dboperations.addUser(user,hash,address,name,sex,phone).then(result=>{
           
    //         if(result == true)
    //         {
    //             res.redirect("/");
    //         }
    //         else{
    //             res.send('loi');
    //         }
    //     }) 
    //     .catch(next);     
    // }
    updateUserApi(req, res, next){
        let user = req.body.username; 
        let address = req.body.address;
        let name = req.body.name;
        let sex = req.body.sex;
        let phone = req.body.phone;
        dboperations.editUser(user,address,name,sex,phone).then(result=>{
            res.status(200).send({result});
        })    
    }
    changeSuccess(req, res, next){
        let username = req.body.username; 
        let address = req.body.address;
        let name = req.body.name;
        let sex = req.body.sex;
        let phone = req.body.phone;
        axios.put(`${link}/updateUserApi`,{username,address,name,sex,phone})
        .then(function (response){    
            let result = response.data.result;
            if(result == true)
            {
                res.redirect("/thongtincanhan");
            }
            else{
                res.send('loi');
            }
        })
        .catch(function (error){
            console.log(error)
        })    
    }
    // changeSuccess(req, res, next){
    //     let user = req.body.username; 
    //     let address = req.body.address;
        
    //     let name = req.body.name;
    //     let sex = req.body.sex;
        
    //     let phone = req.body.phone;
    //     dboperations.editUser(user,address,name,sex,phone).then(result=>{
    //         if(result == true)
    //         {
    //             res.redirect("/thongtincanhan");
    //         }
    //         else{
    //             res.send('loi');
    //         }
    //     }) 
    //     .catch(next);     
    // }
    uploadfile(req, res, next){
        console.log(req.files);
        let sampleFile = req.files.sampleFile;
        let filename=`${Date.now()}-maiducthang` + sampleFile.name;
        let uploadPath = __dirname + '../../../../public/uploadResults/' + filename;
        console.log(uploadPath);
        sampleFile.mv(uploadPath, function(err) {
            if (err)
              return res.status(500).send(err);
        
              res.redirect('fi');
          });
        
    }
    pfile(req, res, next){
        res.render('filePage');
    }
    
    verifyToken(req, res, next){                                                                                     
        const token=req.cookies.user;
        // console.log(token);
        var result= verifyJWT(token);
        
        if (result)
        {
            next();
        }
        else{
            res.redirect("/");
        }
        
    }  
}

module.exports = new user;