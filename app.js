const express = require("express")

const app = express()


app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.")
})


// API KEY: 89c878cbf46f48c15ea2164efd2679cf-us6
// LIST ID: fbe36be283