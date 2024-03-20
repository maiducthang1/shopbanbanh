// const { password } = require("../dbconfig");

// class Category{
//     constructor(Id_category, Name_category){
//         this.Id_category=Id_category;
//         this.Name_category=Name_category;
//     }
// }
// class Address{
//     constructor(Id_address, Id_province, Id_district, Id_commune){
//         this.Id_address=Id_address;
//         this.Id_province=Id_province;
//         this.Id_district=Id_district;
//         this.Id_commune=Id_commune;
//     }
// }
// class Id_district{
//     constructor(Id_district, Name_district){
//         this.Id_district=Id_district;
//         this.Name_district=Name_district;
//     }
// }
// class Id_province{
//     constructor(Id_province, Name_province){
//         this.Id_province=Id_province;
//         this.Name_province=Name_province;
//     }
// }
// class Id_commune{
//     constructor(Id_commune, Name_commune){
//         this.Id_commune=Id_commune;
//         this.Name_commune=Name_commune;
//     }
// }
// class Userr{
//     constructor(Id_user, Id_role, Id_address, Email, Password, Name_user, Sex, Phone_number){
//         this.Id_user=Id_user;
//         this.Id_role=Id_role;
//         this.Id_address=Id_address;
//         this.Email=Email;
//         this.Password=Password;
//         this.Name_user=Name_user;
//         this.Sex=Sex;
//         this.Phone_number=Phone_number;
//     }
// }
// class Role{
//     constructor(Id_role, Service){
//         this.Id_role=Id_role;
//         this.Service=Service;
//     }
// }
// class Product{
//     constructor(Id_product, Id_category, Id_user, Name_product, Describe, Price, Link_image){
//         this.Id_product = Id_product;
//         this.Id_category = Id_category;
//         this.Id_user = Id_user;
//         this.Name_category = Name_product;
//         this.Describe = Describe;
//         this.Price = Price;
//         this.Link_image = Link_image;
//     }
//  }
//  class Bill{
//     constructor(Id_bill, Id_user, Date, Paid){
//         this.Id_bill = Id_bill;
//         this.Id_user = Id_user;
//         this.Date = Date;
//         this.Paid = Paid;
//     }
//  }
//  class Cart{
//     constructor(Id_cart, Id_user, Quantity, total_price){
//         this.Id_cart = Id_cart;
//         this.Id_user = Id_user;
//         this.Quantity = Quantity;
//         this.total_price = total_price;
//     }
//  }
// module.exports = Category;