var admin = require("firebase-admin");
var serviveAccount = require("./thangne.json");

admin.initializeApp({
    credential: admin.credential.cert(serviveAccount)
});
module.export = admin; 