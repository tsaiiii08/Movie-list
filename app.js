// require packages used in the project
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const moviesList = require('./movies.json')


//express tamplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: moviesList.results })
})

app.get('/movies/:movie_id',(req,res)=>{
  const movie= moviesList.results.find(function(movie){
    return movie.id.toString() === req.params.movie_id
  })
  res.render('show', { movie: movie})
})

app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const moviesMatched = moviesList.results.filter(function (movie) {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())})
  res.render('index', { movies: moviesMatched,keyword: req.query.keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

//static files