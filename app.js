// const query  = require('express');
const express = require('express');      
const https = require('https');
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({extended:true}))

// to get request from the index file 

app.get('/', (req, res) => 
  {
     res.sendFile(__dirname + '/index.html')
   
    
  })

  // by body praiser we fetch to the data 

  app.post('/',function(req, res){
     
    const query = req.body.cityName
    const apiKey = "284ede5e87b9fc22c170495a77f8992f"
       
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+ query +"&units=metric";
    
    https.get(url,function(response){
        // console.log(response.statusCode)
 
        // on will help you go through the data 
         
        response.on("data", function(data){
          const weather = JSON.parse(data)
          const windSpeed = weather.weather[0].id
          const country = weather.sys.country
          const icon = weather.weather[0].icon
          const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
         
 

          //  sending back to the client
          res.write("<h1> country is </h1>" + country )
          res.write("<h1> Temperature is </h1>" + windSpeed )
          res.write("<img src=" + imageURL +">")
          res.send()
        }
        )
        
      }
    )


  })

  




app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })