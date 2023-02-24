const express= require("express");
const https= require("https");
const app= express();
const bodyparser= require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
        
        const query=req.body.cityname;
    const apikey= "apikey";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata= JSON.parse(data)
            const temp= weatherdata.main.temp
            const weatherdes= weatherdata.weather[0].description
            const icon= weatherdata.weather[0].icon
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<P>the weather is "+ weatherdes+ ".</p>");
            res.write("<h1>the temperature in "+query+" is "+ temp+ " degree celcius.</h1>");
            res.write("<img src=" + imageurl+">");
            res.send();
        });
    });
});





app.listen(3000,function(){
    console.log("server running on port 3000");
});
