

const express = require('express')
const cors = require('cors')
const app = express()
PORT = 3000

app.use(cors());
app.use(express.json());

const jsonData = require('./data.json')

app.listen(PORT, () => {
    console.log('i am ready to gooooooo')
})

app.get('/', mainData)
app.get('/favorite', favorites)
app.use(function serverError(req,res,next,arr){
    res.status(500).json({
        "status": 500,
        "responseText": "Sorry, something went wrong"
    })
})
app.get('*',pageNotfound)

function favorites(requast, respons) {

    respons.status(201).send('Welcome to Favorite Page')
}

function mainData(requast, respons) {

    let movies = new Movie(jsonData.title, jsonData.poster_path, jsonData.overview)
    console.log(movies)
    respons.status(200).json(movies)
}

function pageNotfound(requast, respons) {
    respons.status(404).json({
        code: 404,
        message: 'page Not found'
    })
}
function server(requast, respons) {
    respons.status(500).json({
        code: 500,
        message: 'page Not found'
    })
}

//    function mainData(respons,requast){
//     jsonData.map(ele=>
//         new movie (ele.title,ele.poster_path,ele.overview)
//      )
//      respons.status(200).json(allMovie)
//    }


function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

