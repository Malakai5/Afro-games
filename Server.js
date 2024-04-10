let express = require('express');
let app = express();

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

let entries = ["Cereals", "Avatar characters", "Fried foods"];
let display = "This Hoe EMPTY"

function shuffle(list){
    for (let i = list.length - 1; i > 0;i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = list[i]
        list[i] = list[j]
        list[j] = temp
    }
}

app.get('/getDisplay', function (req, res) {
        res.end( display );
})

app.get('/changeDisplay', function (req, res){
    if (entries.length !== 0){
        shuffle(entries)
        display = entries[0]
        entries.splice(0,1)
        console.log(entries)
        res.end( "Done" );
    }
    else {
        display = "This Hoe EMPTY, stop being boring y'all 🥸"
        res.end( "Empty" );
    }
})

app.post('/inputSubmission/:input', function (req, res){
    let entry = req.params.input
    entries.push(entry)
    res.end("Thanks for adding")
})

let server = app.listen(8080, function () {
    console.log("Express App running at http://127.0.0.1:8080/");
})
