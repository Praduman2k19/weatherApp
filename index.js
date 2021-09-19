// install -> npm init
// install -> npm i requests

const fs=require("fs")
const http=require('http');
const requests=require("requests")

const homeFile=fs.readFileSync('home.html', "utf-8");

const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp); 
    temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min); 
    temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max); 
    temperature=temperature.replace("{%location%}",orgVal.name);
    temperature=temperature.replace("{%country%}",orgVal.sys.country); 
    temperature=temperature.replace("{%tempstatus%}", "orgVal.weather[0].main"); 
    console.log(orgVal.weather[0].main)
    return temperature;
}

const server=http.createServer((req,res)=>{
    if(req.url=="/"||true)
    {
        const city="gaya";
        requests("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6cc4835cc571f2b80542b704eb554b12")
        .on("data",(chunk)=>{
            const objdata=JSON.parse(chunk);
            const arrData=[objdata];
            // console.log(data);
            // console.log(arrayData[0].main.temp);
            const realTimeData =arrData.map((val)=>replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData);
        })
        .on("end",(err)=>{
            if(err) return console.log("connection closed due to error");
            {
                console.log("jhg");
                res.end();
            }
        });
    }
    else{
        console.log("Page not found");
    }
});
server.listen(4200,"localhost")