const devSetting = require("./devMode.config");
// local testing url
var password = 'Qwe.1234';
// server url
if(devSetting.devMode == 1){
  password = "ECE651Winter2022#16";
}
module.exports = {
    host: 'localhost',
    user: 'root',
    // password: "ECE651Winter2022#16",
    password: password,
    database: 'test'
};