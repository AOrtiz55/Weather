const express = require("express");
const https = require("https");//this is what you use to grab api from different site
const app = express();
const parser = require("body-parser");
const colors = require('colors');
app.use(parser.urlencoded({extended:true}));
function changebackground(){

}

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html" );

})
app.post("/",function(req,res){
var inpute = req.body.multiply;
const query = req.body.cityName;
const apiKey = "3f298e52da1c4724a6d7eff6afd4720f";
const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
//make sure you add the https infront of you api site. like i did from postman
//use get to get the api server and the url is what we wrote to not have a long url

https.get(url, function(response){//use response to grab the data
  console.log(response.statusCode);//will show you if your code is good,200 is good



response.on("data", function(data){
  const weatherData = JSON.parse(data)// for response it will give it to you in code.
  //using JSON will convert it into the server as aobject just like how you wouyld see it pretty
//this above will say buffer
const temp = weatherData.main.temp//temp is what call from the object server json.
//look at base:stations and you can see where we got this info
const weather = weatherData.weather[0].description
//you need to include[0] when grabbing stuff
const icon = weatherData.weather[0].icon
const imageURL = "http://openweathermap.org/img/wn/"+ icon+"@2x.png"
console.log(temp);
console.log(weather);
//console.log(weatherData);
res.write("<h1>Todays Weather Forecast</h1>");
res.write("<h2>The Temperature in "+query+" is "+ temp +" Degrees Fahrenheit.</h2>");
res.write("<p>the weather is currently "+ weather+"<p>");

res.write("<img src= "+ imageURL+">");

//to include multiple lines we use write
res.send()//you can only have one of these

/*const object = {
  name:"aaron",
  favFood: "Ramen"
}
//now your stuff will be displayed as inside{}
console.log(JSON.stringify(object));//now this will convert it intp a string in your command center

*/
})

})


})



app.listen(3000, function(){
console.log("Server running on port 3000.".blue);
})
