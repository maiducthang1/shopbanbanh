// const config = require('../dbconfig');
// const sql = require('mssql');
// const util = require("util");
// const path = require("path");
// const multer = require("multer");

// async function adduser(tk,mk){
//     try{
        
//         let pool = await sql.connect(config);
//         let addUser = await pool.request()
//         // .input('Id', sql.Int, Userr.Id_user)
//         .input('Email', sql.NVarChar(50), tk)
//         .input('Password', sql.NVarChar(50), mk)
//         // .query("Select * from Userr where (Id_user, Id_role, Id_address, Email, Password, Name_user, Sex, Phone_number) = (@Id,1,1,@Email,@Password,'a',1,123123)");
//         .query("Select * from Userr where Email = @Email and Password = @Password");
//         return addUser.recordset;
//     }
    
//     catch(error){
//         console.log('loi server:',error);
//     }
// }

// module.exports = {
    
//     adduser : adduser
    
// }
const config = require('../dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const {createJWT} = require('../middleware/JWTeff');
async function checkLogin(user,password){
    try{
        let pool = await sql.connect(config);
        
        let checkuser = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('password', sql.NVarChar(50), password)
        .query("Select * from Userr where Email = @username ");
        const validPassword = await bcrypt.compare(password, checkuser.recordset[0].Password);
        var result= [];
        result.push(checkuser.recordset);
        let token = createJWT(user);
        // result.push(checkuser.recordset);
        // console.log(result[0]);
        if  (validPassword){return [checkuser.recordset,token];}        
    }
    catch(error){
        console.log(error);
    }
}
async function checkUser(user){
    try{
        let pool = await sql.connect(config);
        
        let checkuser = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("Select * from Userr where Email = @username ");
        var result= [];
        result.push(checkuser.recordset);
        // result.push(checkuser.recordset);
        // console.log(result[0][0].Id_role==2)
        if  (result[0][0].Id_role == 2){return true}  
        else return false;      
    }
    catch(error){
        console.log(error);
    }
}

async function addUser(user,password,address,name,sex,phone){
    try{
        let pool = await sql.connect(config);
        let dem = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("Select * from Userr where Email = @username");
        if(dem.recordset.length > 0){
            return false;
        }else {
        let checkuser = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('password', sql.NVarChar(200), password)
        .input('address', sql.NVarChar(200), address)
        .input('name', sql.NVarChar(50), name)
        .input('sex', sql.Int, sex)
        .input('phone', sql.NVarChar(50), phone)
        .query("Insert into Userr (Email,Password,Address,Name_user,Sex,Phone_number,Id_role) values (@username,@password,@address,@name,@sex,@phone,1)");
        checkuser = await pool.request()
        .query("Insert into Bill (Id_user,Date,State) values ((select max(Id_user) from Userr),getdate(),0)");
        return true;
        }
    }
    catch(error){
        console.log(error);
    }
}
async function editUser(user,address,name,sex,phone){
    try{
        let pool = await sql.connect(config);
        let setuser = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('address', sql.NVarChar(200), address)
        .input('name', sql.NVarChar(50), name)
        .input('sex', sql.Int, sex)
        .input('phone', sql.NVarChar(50), phone)
        .query("UPDATE Userr SET Address=@address,Name_user=@name,Sex=@sex,Phone_number=@phone where Email=@username");
        
        return true;
        
    }
    catch(error){
        console.log(error);
    }
}
async function getUser(user){
    try{
        
        let pool = await sql.connect(config);
        let userdata = await pool.request().input('username', sql.NVarChar(50), user).query("Select * from Userr where Email=@username");
        return userdata.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function product(id){
    try {
        let pool = await sql.connect(config);
        let checkproduct = await pool.request()
        .input('iditem', sql.Int, id)
        .query("Select * from Product where Id_product=@iditem");
        
        return checkproduct.recordset;
    } catch (error) {
        console.log(error);
    }
}
async function addcart(user,id){
    try{
        let pool = await sql.connect(config);
        let checkbill = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('iditem', sql.Int, id)
        .query("select * from Cart where Id_bill=(select Id_bill from Bill where Id_user=(Select Id_user from Userr where Email = @username) and State=0) and Id_product=@iditem");
        // if (Object.values(checkbill.recordset).length ===0)Select * From Bill Inner Join Name_product,Price On Bill.Id_product = Product.Id_product
        if (checkbill.recordset.length == 0){
        let addcart = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('iditem', sql.Int, id)
        .query("Insert into Cart (Id_product,Quatity,Id_bill) values (@iditem,1,(select Id_bill from Bill where Id_user=(Select Id_user from Userr where Email = @username) and State=0))")
        }else{
        let addproduct = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('iditem', sql.Int, id)
        .query("UPDATE Cart SET Quatity = 1 + Quatity WHERE Id_product = @iditem and Id_bill=(select Id_bill from Bill where Id_user=(Select Id_user from Userr where Email = @username) and State=0)");
        }
        return true;
    }
    catch(error){
        console.log(error);
    }
}
async function deletecart(id){
    try {
        let pool = await sql.connect(config);
        let checkbill = await pool.request()
        .input('iditem', sql.Int, id)
        .query("Delete from Cart where Id_cart=@iditem");
        
        return true;
    } catch (error) {
        console.log(error);
    }
}
async function getcart(user){
    try{
        let pool = await sql.connect(config);
        let cart = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("Select * from Cart join Product on Cart.Id_product = Product.Id_product  where Id_bill=(select max(Id_bill) from Bill where Id_user=(select Id_user from Userr where Email=@username)) ");
        
        return cart.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function getbilldetail(bill){
    try{
        let pool = await sql.connect(config);
        let billdetail = await pool.request()
        .input('bill', sql.Int, bill)
        .query("Select * from Cart join Product on Cart.Id_product = Product.Id_product  where Id_bill=@bill ");
        return billdetail.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function confirmbill(bill){
    try{
        let pool = await sql.connect(config);
        let billdetail = await pool.request()
        .input('bill', sql.Int, bill)
        .query("Update Bill SET State=2  where Id_bill=@bill ");
        return billdetail.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function cancelbill(bill){
    try{
        let pool = await sql.connect(config);
        let billdetail = await pool.request()
        .input('bill', sql.Int, bill)
        .query("Update Bill SET State=3  where Id_bill=@bill ");
        return billdetail.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function getbill(user){
    try{
        let pool = await sql.connect(config);
        let bill = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("Select * from Bill where Id_user=(select Id_user from Userr where Email=@username) and State > 0");
        // join Cart on Bill.Id_bill = Cart.Id_bill where Cart.Id_bill=(select max(Id_bill) from Bill 
        return bill.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function savetobill(user){
    try{
        let pool = await sql.connect(config);
        let bill = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("UPDATE Bill SET State=1, Date=getdate() where Id_user=(select Id_user from Userr where Email=@username) and State=0");
        // join Cart on Bill.Id_bill = Cart.Id_bill where Cart.Id_bill=(select max(Id_bill) from Bill
        bill = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("Insert into Bill (Id_user,Date,State) values ((select Id_user from Userr where Email=@username),getdate(),0)");
        return true;
    }
    catch(error){
        console.log(error);
    }
}
module.exports  = {
    addUser: addUser,
    editUser: editUser,
    getUser: getUser,
    checkLogin: checkLogin,
    checkUser: checkUser,
    product: product,
    addcart: addcart,
    deletecart: deletecart,
    getcart: getcart,
    getbill: getbill,
    getbilldetail: getbilldetail,
    confirmbill: confirmbill,
    cancelbill: cancelbill,
    savetobill: savetobill
}