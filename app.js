//const request = require('request')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

//edit info using information from api, edit at the end ?units=us

/*
request({ url: url }, (error, response) => {
    //console.log(response)
    const data = JSON.parse(response.body)
    console.log(data)
})


//Request tiene una propiedad que se puede hacer parsing de json al definir la funcion


request({ url: url, json: true }, (error, response) => {
    //console.log(response.body)
    //console.log('It is currently ' + response.body.currently.temperature + ' degrees')
    console.log(response.body.daily.data[0].summary + ' degrees')
})
*/

//Challenge

/*
url_geo = 'https://api.mapbox.com/geocoding/v5/
request({url: url_geo, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const coordinates = response.body.features[0].geometry.coordinates
        console.log(coordinates)
        //Utilizar funciones dentro de un archivo Utils
        forecast(44.1545, -75.7088, (error, data) => {
            console.log('Error', error)
            console.log('Data', data)
        })
    }
})

*/

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    /*
    geocode(address, (error, data) => {
        if (error) {
            return console.log(error)
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(data.location)
            console.log(forecastData)
        })
    })
    */

    // Destructuring with ES6
    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

