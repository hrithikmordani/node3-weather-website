// const url = 'http://api.weatherstack.com/current?access_key=3cd56078c12b8ec2a1c2ccd90eeaafae&query=19.1281402,72.8265994'
// request({url:url,json:true},(error,response)=>{
//     if(error){
//         console.log("Unable to connect to weather service")

//     }
//     else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     else{
//         console.log(response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature + " degrees outside. It feels like "+response.body.current.feelslike+" degrees")

//     }
    
    
// })

const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=3cd56078c12b8ec2a1c2ccd90eeaafae&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                current_temp: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }

    })

}


module.exports=forecast