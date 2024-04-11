import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5000;

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



app.get("/", async(req,res) =>{
    try {
        var response = await axios.request(options);
       let result = response.data;
        let jsString = JSON.stringify(result);
        let jsObject = JSON.parse(jsString);

        const locationData =jsObject.location;
        const currentProperties = jsObject.current

       
      //  console.log(currentProperties);
         
        // separate out specific part of data
        // response = JSON.parse(jsonRespons
        res.render("index.ejs",{wholeObj:jsObject})
    } catch (error) {
        console.error(error);
    }
})





app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})





