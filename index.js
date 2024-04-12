import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

 const danaCoordinates = "34.1962,22.0536"


const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: danaCoordinates},
  headers: {
    'X-RapidAPI-Key': 'c93cedb6bfmshdbd8f5598e8443cp18397ejsn066c2e325810',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

let lat ="";
let lon ="";

app.get("/", async(req,res) =>{
   res.render("weatherData.ejs");
        //  
});

app.post("/", async(req,res) =>{
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: `${req.body.latittude},${req.body.longitude}`},
    headers: {
      'X-RapidAPI-Key': 'c93cedb6bfmshdbd8f5598e8443cp18397ejsn066c2e325810',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  res.render("index.ejs",{wholeObj:jsObject})
});





app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})





