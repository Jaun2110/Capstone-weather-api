import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) =>{
   res.render("weatherData.ejs");
         
});

app.post("/", async(req,res) =>{
  // console.log(`${req.body.latitude},${req.body.longitude}`)
 const API_Key = '0148c874ffdd49eebd1ddbfb0dcddb78';
 let city = req.body.city;
 let country = req.body.country;
 const API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&key=${API_Key}`;
 try {
  
  const response = await axios.get(API_URL);
  // console.log(response);
  const resultString = JSON.stringify(response.data);
   const resultObj = JSON.parse(resultString);
  const {lat,lng} = resultObj.results[0].geometry;
  // console.log(resultObj.results[0].geometry.lng);
  console.log(`lat: + ${lat}`);
  console.log(`lon: + ${lng}`);
//  call weather api
getWeatherData(lat,lng);

 } catch (error) {
  console.error(error.message);
 }
  
});

async function getWeatherData(latitude,longitude){
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: `${latitude},${longitude}`},
    headers: {
      'X-RapidAPI-Key': 'c93cedb6bfmshdbd8f5598e8443cp18397ejsn066c2e325810',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    const responseString = JSON.stringify(response.data);
    const jsObject = JSON.parse(responseString);
    res.render("index.ejs",{wholeObj:jsObject})
    // console.log(jsObject)
    
  } catch (error) {
    console.error(error);
  }

}



app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})





