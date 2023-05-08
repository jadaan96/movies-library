

const express = require('express')
const cors = require('cors');
const axios  = require('axios');
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3005 ;
const datajson=require('./Movie Data/datajson.json')
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`i am ready to gooooooo ${PORT}`)
})

app.get('/', mainData)
app.get('/favorite', favorites)
app.get('/trending',trending)
app.get('/search',searchFun)
app.get('/top_rated',topRated)
app.get('/upcoming',upcoming)




async function trending(requast, respons) {
    // let movies = new Movie(jsonData.title, jsonData.poster_path, jsonData.overview)
    console.log(Movie.all)
    movies=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API}`)
    movies.data.results.map(items =>
        new Movie(items.id,items.title, items.release_date,items.poster_path, items.overview) )
    respons.status(200).json(Movie.all)
}
function searchFun(req, res) {
    const searchQuery = req.query.search;
    console.log(req.query)
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API}&query=${searchQuery}`).then(result => {
      res.status(200).json({
        code: 200,
        movies: result.data.results
      })
    }).catch(err => {
        serverError(err, req, res)
    })
  }

  function topRated(req, res) {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API}&language=en-US&page=1`).then(result => {
      res.status(200).json({
        code: 200,
        movies: result.data.results
      })
    }).catch(err => {
        serverError(err, req, res)
    })
  }
  function upcoming(req, res) {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API}&language=en-US&page=1`).then(result => {
      res.status(200).json({
        code: 200,
        movies: result.data.results
      })
    }).catch(err => {
        serverError(err, req, res)
    })
  }

app.use(serverError)
    function serverError(error,req,res){
    res.status(500).json({
        "status": 500,
        "responseText": "Sorry, something went wrong"
    })
}
app.get('*',pageNotfound)

function favorites(requast, respons) {

    respons.status(201).send('Welcome to Favorite Page')
}

function mainData(requast, respons) {

    let firstmovies = new Movie(datajson.title, datajson.poster_path, datajson.overview)

    respons.status(200).json(firstmovies)
}

function pageNotfound(requast, respons) {
    respons.status(404).json({
        code: 404,
        message: 'page Not found'
    })
}



function Movie(id,title, poster_path,release_date, overview) {
    this.id=id;
    this.title = title;
    this.poster_path = poster_path;
    this.release_date=release_date;
    this.overview = overview;
    Movie.all.push(this)

}

 Movie.all=[];