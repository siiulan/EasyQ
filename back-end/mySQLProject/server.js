const express = require("express");
const cors = require("cors");
const app = express();
// var corsOptions = {
//   origin: "http://localhost:8080"
// };
// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to EasyQ" });
// });
// app.use(cors(corsOptions));
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require("./routes/registration.routes.js")(app);
require("./routes/instructor.routes.js")(app);
// <<<<<<< TA
require("./routes/ta.routes.js")(app);
// =======
require("./routes/student.routes.js")(app);
// >>>>>>> backEnd
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});