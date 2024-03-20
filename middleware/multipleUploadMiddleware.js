const util = require("util");
const path = require("path");
const multer = require("multer");
const { text } = require("body-parser");
const sql = require('mssql');
const config = require('../dbconfig');
var tenf='null';
// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let storage = multer.diskStorage({
  // Định nghĩa nơi file upload sẽ được lưu lại
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../CakeShop/public/uploadResults`));
  },
  
  filename: (req, file, callback) => {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
    let filename = `${Date.now()}-hoagtrinhdev-${file.originalname}`;
    callback(null, filename);
    tenf='/public/uploadResults/'+filename;
    // console.log(tenf);
    async function addtenf(tenf){
      try{
          let pool = await sql.connect(config);
          let insertCategory = await pool.request()
          .input('Id', sql.Int, 7)
          .input('Name', sql.NVarChar(500), tenf)
          .query("Insert Into Category (Id_category, Name_category) Values (@Id, @Name)");
          return insertCategory.recordsets;
      }
      catch(error){
          console.log(error);
      }
  }  
  addtenf(tenf);
  }
});
let uploadManyFiles = multer({storage: storage}).array("many-files", 17);
// Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
let multipleUploadMiddleware = util.promisify(uploadManyFiles);

module.exports = multipleUploadMiddleware;
exports.tenf = tenf;