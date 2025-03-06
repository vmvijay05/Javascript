const express = require('express');
const app = express();
const PORT = 4000;
app.get("/api/register", (req, res) => {
    res.status(200);
    res.send({
      status:200,
      message:"Data Received Successfully"
})
console.log("Server Data sent successfully");
})
app.listen(PORT, () => {
    console.log(`Server is Listening on Port: ${PORT}`)
})



