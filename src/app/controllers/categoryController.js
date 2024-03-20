const express = require('express');
const app = express();
const dboperations = require('../../../dboperations/dbop_category'); 
const dbopuser = require('../../../dboperations/dpop_user'); 
const body = require('body-parser');
const { json } = require('body-parser');
const { verifyJWT } = require('../../../middleware/JWTeff');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
const link = "http://localhost:3000"
const { default: axios } = require('axios');
class CategoryController {
    
    gethomeapi(req, res){
        dboperations.gethomepage().then(result=>{
            res.status(200).send({result});
        })
    }
    getproductapi(req, res){
        dboperations.getproducts().then(result=>{
            res.status(200).send({result});
        })
    }
    getcategorys(req, res){
        axios.get(`${link}/CakeShop/api`)
        .then(function (response){
            let result = response.data.result;
            var token=verifyJWT(req.cookies.user);
            let prod=result[0];
            let cate=result[1];
            var username=[{thang : token.name}];
            res.render('index',{prod,cate,username}); 
        })
        // dboperations.gethomepage().then(result=>{
        //     var token=verifyJWT(req.cookies.user);
        //     let prod=result[0];
        //     let cate=result[1];
        //     var username=[{thang : token.name}];
        //     // res.json(result); 
        //     // const accessToken=localStorage.getItem('accessToken');
        //     // res.cookie('user', accessToken);
        //     res.render('index',{prod,cate,username}); 
        // })
    }
    trangchu(req, res){
        res.render('index'); 
    }
    dangnhap(req, res){
        res.render('login'); 
    }
    gioithieu(req, res){
        var token=verifyJWT(req.cookies.user);
        var username=[{thang : token.name}];
        res.render('about',{username}); 
    }
    meanu(req, res){
        axios.get(`${link}/CakeShop/api`)
        .then(function (response){
            let result = response.data.result;
            var token=verifyJWT(req.cookies.user);
            let prod=result[0];
            let cate=result[1];
            var username=[{thang : token.name}];
            res.render('menu',{prod,cate,username}); 
        })
    }
    login(req, res){
        let userr = {...req.body};
        dbopuser.adduser(userr).then(result=>{
        if (result.length > 0){
            // console.log('loi1');
            // console.log(res.redirect('/aaaaa'));            
        }
        else{
            // console.log('loi');
            res.render('login');  
        }
        })
    }
    getcategory(req, res){
        //DBCC CHECKIDENT (Category, RESEED, 4);
        dboperations.getcategory(req.params.Id).then(result=>{
            res.json(result[0]);
        })
    }
    deletecategory(req, res){
        dboperations.deletecategory(req.params.Id).then(result=>{
            // res.json(result[0]);
            res.send({result: "cập nhật thành công"});
        })
    }
    addcategory(req, res){
        let category = {...req.body}
        dboperations.addcategory(category).then(result=>{
            res.status(201).json(result);
        })
    }
    updatecategory(req, res){
        let category = {...req.body}
        dboperations.updatecategory(category).then(result=>{
            res.status(201).json(result);
        })
    }
    searchcategory(req, res){
        dboperations.searchcategory(req.params.Id).then(result=>{
            res.json(result);
        })
    }
    
}
// const path = require("path");
// let getHome = (req, res) => {
//   return res.sendFile(path.join(`${__dirname}/../resources/views/index.hbs`));
// };
// module.exports = {
//   getHome: getHome
// };
module.exports = new CategoryController;