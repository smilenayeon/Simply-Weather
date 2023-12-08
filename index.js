import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const config="2d6edec5fa74eee4828f548a33d03398";
const API_Geo="http://api.openweathermap.org/geo/1.0/direct"; 
const API_URL="https://api.openweathermap.org/data/2.5/weather";   

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 


app.get("/",async(req,res)=>{
    try{
        const geoResult= await axios.get(API_Geo+"?q=London&limit=1&appid="+config);
        const lat=geoResult.data[0].lat;
        const lon=geoResult.data[0].lon;
        const weatherResult= await axios.get(API_URL+"?lat="+lat+"&lon="+lon+"&units=metric&appid="+config);
       res.render("index.ejs",{
        location:geoResult.data[0].name,
        temperature:weatherResult.data.main.temp, 
        weatherWord:weatherResult.data.weather[0].description,
        icon:weatherResult.data.weather[0].icon,
        humidity:weatherResult.data.main.humidity,
        windSpeed:weatherResult.data.wind.speed,});
    }catch(error){
        console.error(error.message);
    }
})

app.post("/submit",async(req,res)=>{
    const location = req.body.location;
    console.log(location);
    try{
        const geoResult= await axios.get(API_Geo+"?q="+location+"&limit=1&appid="+config);
        const lat=geoResult.data[0].lat;
        const lon=geoResult.data[0].lon;
        const weatherResult= await axios.get(API_URL+"?lat="+lat+"&lon="+lon+"&units=metric&appid="+config);
       res.render("index.ejs",{
        location:geoResult.data[0].name,
        temperature:weatherResult.data.main.temp, 
        weatherWord:weatherResult.data.weather[0].description,
        icon:weatherResult.data.weather[0].icon,
        humidity:weatherResult.data.main.humidity,
        windSpeed:weatherResult.data.wind.speed,});
    }catch(error){
        console.error(error.message);
    }
})


app.listen(port, ()=>{console.log(`running on port ${port}.`);});