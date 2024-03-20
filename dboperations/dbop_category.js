const config = require('../dbconfig');
const sql = require('mssql');
const util = require("util");
const path = require("path");
const multer = require("multer");


async function getcategorys(){
    try{
        let pool = await sql.connect(config);
        let namecategory = await pool.request().query("Select * from Category");
        
        return namecategory.recordset;
    }
    catch(error){
        console.log(error);
    }
}

async function getcategory(cateId){
    try{
        let pool = await sql.connect(config);
        let namecategory = await pool.request()
        .input('input_parameter', sql.Int, cateId)
        .query("Select * from Category where Id_category = @input_parameter");
        return namecategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
async function deletecategory(cateId){
    try{
        let pool = await sql.connect(config);
        let deletecategory = await pool.request()
        .input('category_delete', sql.Int, cateId)
        .query("Delete From Product Where Id_category = @category_delete Delete From Category Where Id_category = @category_delete");
        return deletecategory.recordsets;
    }
    catch(error){
        console.log(error);    

    }
}

async function addcategory(Category){
    try{
        let pool = await sql.connect(config);
        let insertCategory = await pool.request()
        .input('Id', sql.Int, Category.Id_category)
        .input('Name', sql.NVarChar(500), Category.Name_category)
        .query("Insert Into Category (Id_category, Name_category) Values (@Id, @Name)");
        return insertCategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
// async function addcategory(){
//     try{
//         tt=multipleUploadMiddleware.tenf;
//         console.log(tt);
//         console.log('1111111111111111111111111111');
//         let pool = await sql.connect(config);
//         let insertCategory = await pool.request()
//         .input('Id', sql.Int, 6)
//         .input('Name', sql.NVarChar(500), tt)
//         .query("Insert Into Category (Id_category, Name_category) Values (@ID, @Name)");
//         return insertCategory.recordsets;
//     }
//     catch(error){
//         console.log(error);
//     }
// }
async function updatecategory(Category){
    try{
        let pool = await sql.connect(config);
        let updateCategory = await pool.request()
        .input('Id', sql.Int, Category.Id_category)
        .input('Name', sql.NVarChar(500), Category.Name_category)
        .query("UPDATE Category SET Name_category = @Name WHERE Id_category = @Id");
        return updateCategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function searchcategory(cateId){
    try{  
        let pool = await sql.connect(config);
        let namecategory = await pool.request()
        .input('input_parameter', sql.NVarChar(50), cateId)
        .query("Select * from Category where Name_category like '%' + @input_parameter + '%' ");
        return namecategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function gethomepage(){
    try{
        var result=[];
        let pool = await sql.connect(config);
        let product = await pool.request().query("Select * From Product Inner Join Category On Product.Id_category = Category.Id_category");
        result.push(product.recordset);
        let category = await pool.request().query("Select * from Category");
        result.push(category.recordset);
        let bill = await pool.request().query("Select * from Bill");
        // for(var i=0; i < bill.recordset.length;i++)
        //     if(bill.recordset[i].State=='1')console.log(1);
        //     else console.log(0);
        result.push(bill.recordset);
        return result;
    }
    catch(error){
        console.log(error);
    }
}

async function getproducts(){
    try{
        var result=[];
        let pool = await sql.connect(config);
        let product = await pool.request().query("Select * From Product Inner Join Category On Product.Id_category = Category.Id_category");
        result.push(product.recordset);
        return result;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    searchcategory : searchcategory,
    updatecategory : updatecategory,
    addcategory : addcategory,
    getcategorys : getcategorys,
    getcategory : getcategory,
    deletecategory : deletecategory,
    gethomepage : gethomepage,
    getproducts : getproducts
}