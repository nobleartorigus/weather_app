const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname, '../public/'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

// app.com
// app.com/help
// app.com/about

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

/*
app.get('', (req, res) => {
    //res.send('Hello express!')
    res.send('<h1>Weather</h1>')
})
*/

/*
//Route handlers replaced with html
app.get('/help', (req, res) => {
    res.send({
        name: 'Daniel',
        age: 24
    }, {
        name: 'Marco',
        age: 31
    })
})
*/

//use handlers hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Nunez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Daniel Nunez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Daniel Nunez',
        helpText: 'Help users'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    /*
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address: req.query.address
    })
    */
    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if (error) {
            return res.send({ error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

//Query
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Daniel Nunez',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 Page')
    res.render('404', {
        title: '404',
        name: 'Daniel Nunez',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})