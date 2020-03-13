const request = require('request')

const url = 'https://api.darksky.net/forecast/acbcb4f32f32f32836fc843489a8ff92/37.8267,-122.4233'
//edit info using information from api, edit at the end ?units=us
//const url = 'https://api.darksky.net/forecast/acbcb4f32f32f32836fc843489a8ff92/37.8267,-122.4233?units=us'

/*
request({ url: url }, (error, response) => {
    //console.log(response)
    const data = JSON.parse(response.body)
    console.log(data)
})
*/

//Request tiene una propiedad que se puede hacer parsing de json al definir la funcion


request({ url: url, json: true }, (error, response) => {
    //console.log(response.body)
    //console.log('It is currently ' + response.body.currently.temperature + ' degrees')
    console.log(response.body.daily.data[0].summary + ' degrees')
})


//Challenge

url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGFuaWVsb3dza2kiLCJhIjoiY2s3cDd2MXVpMGh2ajNocDBna2piMTJ1OSJ9.WfcA6j_mgoHNw3aYWbuBxg&limit=1'

request({url: url_geo, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const coordinates = response.body.features[0].geometry.coordinates
        console.log(coordinates)
    }
})