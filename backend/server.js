const express = require("express");
// const cors = require("cors");
const app = express();
const cors = require("cors")
const chatbotRoute = require("./chatbotTest")
const auth = require("./auth/auth")

app.use(cors());
app.use(express.json());

app.use("/auth", auth)
app.use("/chatbot", chatbotRoute)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000....")
})