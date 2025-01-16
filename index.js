const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
    createTour,
    getTour
} = require("./controllers/dataController")

    const {
        getAfterParties,
        getConcerts,
        getMerchandiseStalls,
    } = require("./controllers/tourController");

const sequelize = require("./models")
const app = express();

app.use(express.json());
app.use(cors());

app.post("/tour", createTour);
app.get("/tour/:id", getTour);

app.get("/data/concerts", getConcerts);
app.get("/data/merchandiseStalls", getMerchandiseStalls);
app.get("/data/afterParties", getAfterParties);

sequelize.authenticate().then(()=>{
    console.log("database Connected..");
}).catch((error)=>{
    console.error("Unable to connect to database", error);
});


app.listen(3000, ()=>{
    console.log("Server is running on server 3000");
});







