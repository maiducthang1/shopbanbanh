const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const fileUpload = require('express-fileupload');
// app.use(express.static(__dirname + '/uploadResults'));
const port = process.env.PORT || 5000;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(fileUpload());
//template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.use(express.static('uploadResults')); 
app.set('views', path.join(__dirname, 'public/resources/views'));
app.set('view engine', 'hbs');

const route = require('./routes');

app.use('/public',express.static(path.join(__dirname, 'public')));

// console.log(verifyJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhhbmciLCJzZXgiOiJuYW0iLCJpYXQiOjE2Nzg5NjIwMjF9.dnJ4yEJzeOmreAjWxmFRXHs3YOxrDkBRNaoQA-WiDn0"));
// let decodedjwt=verifyJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhhbmciLCJzZXgiOiJuYW0iLCJpYXQiOjE2Nzg5NjIwMjF9.dnJ4yEJzeOmreAjWxmFRXHs3YOxrDkBRNaoQA-WiDn0");
// console.log(decodedjwt);
route(app);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


