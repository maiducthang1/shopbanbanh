const config ={
    user: 'sa',
    password: '123',
    server: 'LAPTOP-LD1DK5H9',
    database: 'CakeShop',
    Option:{
        trustedconnection: true,
        enableArithAort: true,
        instacename: 'MSSQLSERVER'
    },
    trustServerCertificate: true,
}

module.exports=config;
// async function requestRefreshToken(tkRefress){
//     //Take refresh token from user
//     let pool = await sql.connect(config);
//     let dbrefreshTokens = await pool.request()
//     .query("Select * from Token");
//     let refreshTokens = dbrefreshTokens.recordset;
//     let getuser = await pool.request()
//         .input('Id_user', sql.Int, refreshTokens[0].Id_user)
//         .query("Select * from Userr where Id_user = @Id_user");
//         let gettoken = await pool.request()
//         .input('Id_user', sql.Int, refreshTokens[0].Id_user)
//     .query("Select Token from Token where Id_user =@Id_user");
//    // Send error if token is not valid
   
//     refreshTokens =  gettoken.recordset;
//     let listdbToken=[];
    
//     for( var key in refreshTokens)
//     {
//       for(var keys in refreshTokens[key])
//       {
//         listdbToken.push(refreshTokens[key][keys]);
//       }
//     }
//     if (!tkRefress) return 2;
//     if (!listdbToken.includes(tkRefress)) {
//       return 3;
//     }
//     jwt.verify(tkRefress, process.env.JWT_REFRESH_KEY, async (err, user) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//       listdbToken = listdbToken.filter((token) => token !== tkRefress);
//       let deletedbtoken = await pool.request().query("delete from Token");
//     if(listdbToken.length != 0 )
//     {
//       for(var temp in listdbToken)
//       {
//         let addTokens = await pool.request()
//       .input('Token', sql.NVarChar(400), temp)
//       .input('id_user', sql.Int, getuser.recordset[0].Id_user)
//       .query("insert into Token (Id_user, Token) VALUES (@Id_user,@Token)");
//       }
//     }
//       //create new access token, refresh token and send to user
//       const newAccessToken = `Bearer `+ generateAccessToken(getuser.recordset[0]);
//       const newRefreshToken = `Bearer `+ generateRefreshToken(getuser.recordset[0]);
//       let addToken = await pool.request()
//       .input('Token', sql.NVarChar(400), newRefreshToken)
//       .input('id_user', sql.Int, getuser.recordset[0].Id_user)
//       .query("insert into Token (Id_user, Token) VALUES (@Id_user,@Token)"); 
//       const listToken = [newAccessToken,newRefreshToken];
//       return listToken;    
    
//   }