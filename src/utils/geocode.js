// const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Four%20bunglows.json?access_token=pk.eyJ1IjoiaHJpdGhpa20xMjA0IiwiYSI6ImNrb3pmNWJpeTAzYnAyd3RlNndsdmY1NjEifQ.2eY_gICdPCn03kfREEQ5sQ'
// request({url:mapurl,json:true},(error,response)=>{
//     if(error){
//         console.log('cannot connect to location service')

//     }else if(response.body.features.length===0){
//         console.log('unable to find location try another search')

//     }else{
//         console.log("found place "+response.body.features[0].place_name)
    
//         console.log("coordinates are:")
//         console.log("Latitude: "+response.body.features[0].center[1]+" Longitude: "+response.body.features[0].center[0])

//     }
    
// })




const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHJpdGhpa20xMjA0IiwiYSI6ImNrb3pmNWJpeTAzYnAyd3RlNndsdmY1NjEifQ.2eY_gICdPCn03kfREEQ5sQ'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('cannot connect to location service',undefined)
        }else if(body.features.length===0){
            callback('unable to find location try another search',undefined)
    
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
    
        }
    })
    
    }

module.exports = geocode