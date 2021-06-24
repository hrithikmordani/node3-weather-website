const path = require('path')
const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const hbs = require('hbs')
const app = express()
console.log(__dirname)
console.log(__filename)

//define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsDir =  path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDir))

app.get("",(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"Hrithik Mordani"
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Hrithik Mordani"

    })
})

app.get("/help",(req,res)=>{
    res.render('help',{
        message:"seeking help",
        title:"Help Page",
        name:'Hrithik Mordani'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })

    }
    geocode(req.query.address,(error,response={})=>{
        if(error){
            return res.send({
                error
            })

        }
        forecast(response.latitude,response.longitude,(error,response_one)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                description: response_one.description,
                current_temp: response_one.current_temp,
                feels_like: response_one.feels_like,
                location: response.location
                
            })
        })

    })

    
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error_message:'Help article not found',
        name:'Hrithik Mordani',
        title:'404'

    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error_message:'Page not found',
        name:'Hrithik Mordani',
        title:'404'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})

