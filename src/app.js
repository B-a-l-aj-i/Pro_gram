import express from "express";


const app = express();



app.get("/user/:id", (req, res) => {

    res.send(req.params)
})


app.use("/test", (req, res) => {
    res.send("test successfull using app.use()");
})

    
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});