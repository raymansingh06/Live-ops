const express = require("express");
const mongoose=require("mongoose");
require('dotenv').config();
const app = express();
const uri= process.env.DB_URI

const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login");
const offerRouter = require("./routes/offers")

const jwt = require("jsonwebtoken");
const cors = require("cors");

const PORT = 8000 || process.env.PORT
mongoose.set('strictQuery', true)
mongoose.connect(uri, (err) => {
    if (err) {
      console.log("Connection to mongodb failed");
    } else console.log("Connection to mongoDB successfully");
  });

const { body } = require("express-validator");


//MIDDELWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(req.url)
    try {
        if (req.url == "/api/v4/login" || req.url == "/api/v4/signup") {
            next();
        } else {
            let token = req.headers.authorization;
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                }
                res.user = decoded.data;
                next()
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

})


//TESTING ROUTE
app.get("/", (req, res) => {
    res.send(" APP WORKING")
})


app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", offerRouter)

app.listen(PORT, () => { console.log(`server started at ${PORT}`) })
