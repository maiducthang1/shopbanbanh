var jwt = require('jsonwebtoken');
require('dotenv').config();
const createJWT = (user) =>{
    let ten = user;
    let payload = {name: ten, password: '123456'};
    let key=process.env.JWT_SECRET;
    let token=null;
    try{
        token = jwt.sign(payload,key);
        // console.log(token);
    }catch(err){
        console.log(err);
    }
    
    // console.log(token);
    return token;
}
const verifyJWT = (token) =>{
    let key=process.env.JWT_SECRET;
    let data=null;
    try{
        let decoded = jwt.verify(token,key);
        data = decoded;
    }catch(err){
        console.log(err);
    }
    return data;
    // jwt.verify(token,key,function(err,decoded){
    //     if(err){
    //         return data;
    //     }
    //     return decoded;
    // });
}
module.exports = {
    createJWT,verifyJWT
}