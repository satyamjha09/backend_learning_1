const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "public")));

app.get("/" , function(req, res)  {
    fs.readdir(`./files` , function(err , files) {
        res.render("index" , {files: files} );
    });
});

app.post('/create' , function(req , res)  {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.js` , req.body.details , function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h1>Error writing file.</h1>");
        }
        res.redirect("/");
    });
});

app.listen(3000 , function() {
    console.log("app is listen on 3000")
});
