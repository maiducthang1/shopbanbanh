const config = require('../dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');


async function addUser(user,password,address,name,sex,phone){
    try{
        let pool = await sql.connect(config);
        let dem = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .query("Select * from Userr where Email = @username");
        console.log(dem.recordset.length)
        if(dem.recordset.length > 0){
            return false;
        }else {
        let checkuser = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('password', sql.NVarChar(200), password)
        .input('address', sql.Int, address)
        .input('name', sql.NVarChar(50), name)
        .input('sex', sql.Int, sex)
        .input('phone', sql.NVarChar(50), phone)
        .query("Insert into Userr (Email,Password,Id_address,Name_user,Sex,Phone_number,Id_role) values (@username,@password,@address,@name,@sex,@phone,1)")
        .query("Insert into Bill (Id_user,Date,State) values ((select max(Id_user) from Userr),getdate(),0)");
        return true;
        }
    }
    catch(error){
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
        // if (Object.values(checkbill.recordset).length ===0)
        if (checkbill.recordset.length == 0){
        let addcart = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('iditem', sql.Int, id)
        .query("Insert into Cart (Id_product,Quatity,Id_bill) values (@iditem,1,(select Id_bill from Bill where Id_user=(Select Id_user from Userr where Email = 'a@hi.hi') and State=0))")
        }else{
        let addproduct = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('iditem', sql.Int, id)
        .query("UPDATE Cart SET Quatity = 1 + Quatity WHERE Id_product = @iditem and Id_bill=(select Id_bill from Bill where Id_user=(Select Id_user from Userr where Email = @username) and State=0)");
        }
    }
    catch(error){
        console.log(error);
    }
}
async function addImage(id,image){
        let pool = await sql.connect(config);
        image='http://localhost:3000/public/resources/views/images/'+image;
       
        let checkbill = await pool.request()
        .input('id', sql.Int, id)
        .input('iditem', sql.NVarChar(200), image)
        .query("UPDATE Product SET Link_image = @iditem where Id_product=@id");
    return true;
}
async function saveProduct(id,name,des,price,cate){
    let pool = await sql.connect(config);
    let checkbill = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar(50), name)
    .input('des', sql.NVarChar(100), des)
    .input('price', sql.Int, price)
    .input('cate', sql.NVarChar(500), cate)
    .query("UPDATE Product SET  Name_product=@name,Describe=@des,Price=@price,Id_category=(select Id_category from Category where Name_category=@cate) where Id_product=@id");
return true;
}
async function deleteProduct(id){
    let pool = await sql.connect(config);
    let checkbill = await pool.request()
    .input('id', sql.Int, id)
    .query("Delete Product where Id_product=@id");
return true;
}
async function deliverbill(id){
    let pool = await sql.connect(config);
    let checkbill = await pool.request()
    .input('id', sql.Int, id)
    .query("UPDATE Bill SET  State=4 where Id_bill=@id");
return true;
}
async function deleteProduct(id){
    let pool = await sql.connect(config);
    let checkbill = await pool.request()
    .input('id', sql.Int, id)
    .query("Delete Product where Id_product=@id");
return true;
}
async function addsp(tensp,giasp,catesp,motasp,imgsp){
    let pool = await sql.connect(config);
    image='http://localhost:3000/public/resources/views/images/'+imgsp;
    
    let checkbill = await pool.request()
    .input('tensp', sql.NVarChar(50), tensp)
    .input('giasp', sql.Int, giasp)
    .input('catesp', sql.Int, catesp)
    .input('motasp', sql.NVarChar(100), motasp)
    .input('imagesp', sql.NVarChar(200), image)
    .query("Insert into Product (Name_product,Price,Id_category,Describe,Link_image,Id_user) values (@tensp,@giasp,@catesp,@motasp,@imagesp,1)");

    var FCM = require('fcm-node');
    var serverKey = 'AAAAN5yQ9IE:APA91bE_3pmyki_N_VnZrs9C3mRbMhgkpVNr3kuvZ0TxJmAQaULbaaAtVzbh9wRv7H7G8YwGayQHrUDruE0QIWT6CvYQBbLiI_FAVSuS1_tXsHAZoHr3X0gZZ_a-lwXdohD01C4ZBC2V'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'cfKqK07CQbmhGtX3GlB5v0:APA91bFcXzd24t8zGmNzw3ZWhxe9p3yIUXtb77IXpyLp5b2X7bTj1Oytt2Ah7gzHJifWHN556AM2DQz3D8B8yN7sDAcKJB_px-7Qm8RjzrFIwwpRV4CQ4mVqFIRzMWyz0dHhLsnTIhhp', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'New cake in shop, open checking', 
            body: `Cake: ${tensp} with only ${giasp}$` 
        },
    
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    return true;
}

module.exports  = {
    addUser: addUser,
    addcart: addcart,
    addImage: addImage,
    saveProduct: saveProduct,
    deleteProduct: deleteProduct,
    deliverbill:deliverbill,
    addsp: addsp
}