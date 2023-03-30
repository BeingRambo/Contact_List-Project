const express = require("express")
const path = require('path')
const port = 8000;

const app = express();


// step 1 add template

// using ejs template
app.set('view engine', 'ejs');
// chosing directory for ejs
app.set('views', path.join(__dirname, 'views'));


// step 2 add parser
//midllewear
app.use(express.urlencoded())

app.use(express.static('assets'));



// //middlewear(1)
// app.use(function(req, resp, next){
//     req.myName="sanjay";
//  // console.log("middlewear 1 called")
//     next();
// })


// //middlewear(2)
// app.use(function(req, resp, next){
//     console.log("my name from mw2 2", req.myName)
//  // console.log("middlewear 2 called")
//     next();
// })



var contactList = [

    {
        name: "sanjay",
        phone: "1122334455"
    },

    {
        name: "Iron-man",
        phone: "2122232324"
    },

    {
        name: "Rambo",
        phone: "1112131415"
    },

    {
        name: "Superman",
        phone: "3132333435"
    }

]




app.get('/', function (req, res) {

    // console.log("from the get route controller",req.myName)
    // console.log(req)  //it says get is true
    return res.render('home', {
        title: "contactlist",
        contactlist: contactList

    });
});



app.get("/about", function (req, res) {

    return res.render('about');
});


//step 3
//adding parse data 
app.post("/create-contact", function (req, res) {

    //  console.log(req)  // it says post is true
    // return res.redirect('/about');


    /////////how parseer Works////////////

    // console.log(req.body);  // it shows typed data
    // console.log(req.body.name); 
    // console.log(req.body.phone); 


    // 1st method
    // contactList.push(

    //     {
    //         name: req.body.name,
    //         phone: req.body.phone

    //     }
    // )

    //2nd method

    contactList.push(req.body)

    return res.redirect('/')

});


//  for deleting the contact
app.get('/delete-contact/', function(req, res){

    //1st way
    // console.log(req.params);
    // let phone = req.params.phone;

    //2nd way
    console.log(req.query);
    let phone = req.query.phone;

    //finding index of phone
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back')
 });




 
 //listen server
app.listen(port, function (err) {

    if (err) {
        console.log("error")
    }
    console.log("express server running on", port)
})

