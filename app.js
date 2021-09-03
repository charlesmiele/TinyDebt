const express = require("express")
const mailchimp = require("@mailchimp/mailchimp_marketing");

const https = require("https")
const app = express()


app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

// When a user requests tinydebt.io/, this is what we send.
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

mailchimp.setConfig({
    apiKey:"89c878cbf46f48c15ea2164efd2679cf-us6",
    server: "us6"
})

// When the user submits the subscriber form, this is what we do.

app.post("/", function(req, res){
    const firstName = req.body.first
    const lastName = req.body.last
    const email = req.body.email
    const listId = "fbe36be283"
    console.log(firstName, lastName, email)
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
}

async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
        })
        res.sendFile(__dirname + "/success.html")
        console.log("Successfully added contact as an audience member. The contact's id is ${response.id}.");
}

run().catch(e => res.sendFile(__dirname + "/failure.html"));
})



app.post("/failure.html", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.")
})


// API KEY: 89c878cbf46f48c15ea2164efd2679cf-us6
// LIST ID: fbe36be283