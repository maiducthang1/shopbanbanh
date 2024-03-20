const express = require('express');
const app = express();
const dboperations = require('../../../dboperations/dbop_admin'); 
const body = require('body-parser');
const { json } = require('body-parser');
// var session = require('express-session');
var {createJWT, verifyJWT} = require('../../../middleware/JWTeff');
const bcrypt = require('bcrypt');
const dpop_user = require('../../../dboperations/dpop_user');
const { default: axios } = require('axios');
const dbop_admin = require('../../../dboperations/dbop_admin');
const link = "http://localhost:3000"
app.use(body.urlencoded({extended: true}));
app.use(body.json());
class admin {
    getdataapi(req, res){
        dboperations.addproduct().then(result=>{
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
            let bill=result[2];
            var username=[{thang : token.name}];
            res.render('admin/home',{prod,cate,bill,username}); 
        })
        
    }
    verifyUser(req, res, next){                                                                                     
        const token=req.cookies.user;
        // console.log(token);
        var result= verifyJWT(token);
        // console.log(result.name);
        dpop_user.checkUser(result.name).then(result=>{
            if (result)
            {
                next();
            }
            else{
                res.redirect("/");  
            }
        })
        
    }
    uploadProduct(req, res, next){
        let id= req.params.Id;
        let nameproduct=req.body.ten;
        let des=req.body.mota;
        let price= req.body.gia;
        let cate=req.body.danhmuc;
        dbop_admin.saveProduct(id,nameproduct,des,price,cate).then(result=>{
            res.redirect('/admin');
        });
        
    }
    deleteProduct(req, res){
        let id= req.params.Id;
        dbop_admin.deleteProduct(id).then(result=>{
            res.redirect('/admin');
        });
    }
    billDeliver(req, res, next){
        let id= req.params.Id;
        dbop_admin.deliverbill(id).then(result=>{
            res.redirect('/admin');
        });
        
    }  
    uploadImage(req, res, next){
        let id= req.params.Id;
        
        console.log(req.files.sampleFile);
        
        let sampleFile = req.files.sampleFile;
        let filename=`${Date.now()}-maiducthang` + sampleFile.name;
        let uploadPath = __dirname + '../../../../public/resources/views/images/' + filename;
        
        sampleFile.mv(uploadPath, function(err) {
            if (err)
              return res.status(500).send(err);
            dbop_admin.addImage(id,filename).then(result=>{
                res.redirect('/admin');
            });
                
            
          });
        
    } 
    themsp(req, res){
        console.log(req.files.sampFile);
        var tensp = req.body.tensp;
        var giasp = req.body.giasp;
        var catesp = req.body.catesp;
        var motasp = req.body.motasp;
        let sampleFile = req.files.sampFile;
        let filename=`${Date.now()}-maiducthang` + sampleFile.name;
        let uploadPath = __dirname + '../../../../public/resources/views/images/' + filename;
        dbop_admin.addsp(tensp,giasp,catesp,motasp,filename).then(result=>{
            sampleFile.mv(uploadPath, function(err) {
                if (err)
                  return res.status(500).send(err);
              });
            
            res.redirect('/admin');
        });
        
        
    } 
}

module.exports = new admin;