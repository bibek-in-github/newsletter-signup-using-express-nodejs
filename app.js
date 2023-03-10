const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
// const { response } = require("express")

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html")


})

app.post("/", (req,res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]

    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/e6e155d37c"
    
    const options = {
        method: "POST",
        auth: "bibek:5576cfc76c0a05ce45723f6c1ede1615-us21"
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/faliure.html")
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData)
    request.end()

})

app.post("/faliure.html", (req,res) => {
    res.redirect("/")

})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000");
})


//  api key 
// 5576cfc76c0a05ce45723f6c1ede1615-us21

//audience id or list id
// e6e155d37c