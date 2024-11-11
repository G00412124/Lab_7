const express = require('express'); // Import express
const app = express(); // Create an express app
const port = 4000; // Set the port

const cors = require('cors'); // Import cors
app.use(cors()); // Use cors

app.use(function(req, res, next) { // Set headers to allow cross-origin requests
  res.header("Access-Control-Allow-Origin", "*");   
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser'); // Import body-parser
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser
app.use(bodyParser.json()); // Parse application/json


const mongoose = require('mongoose'); // Import mongoose
mongoose.connect('mongodb+srv://admin:admin@matthewservices.7cywq.mongodb.net/'); // Connect to the MongoDB database

const movieSchema = new mongoose.Schema({ // Create a new schema
    title: String,   
    year: String,
    poster: String  // Add a title, year, and poster field
});

const movieModel = mongoose.model('myMovies', movieSchema); // Create a new model called myMovies

app.get('/api/movies', async(req, res) => { // Create a get request to /api/movies

    //const movies = [ // Create an array of movies

    const movies = await movieModel.find({}); // Find all movies in the database
    res.status(200).json({movies}); // Send the movies array as a response
});
       // {
        //  "Title": "Avengers: Infinity War (server)",
        //  "Year": "2018",
        //  "imdbID": "tt4154756",
        //  "Type": "movie",
        //  "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
       // }, // Add a title, year, imdbID, type, and poster to each movie object
       // { 
       //   "Title": "Captain America: Civil War (server)",
       //   "Year": "2016",
       //   "imdbID": "tt3498820",
       //   "Type": "movie",
        //  "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
       // },
       // {
       //   "Title": "World War Z (server)",
        //  "Year": "2013",
        //  "imdbID": "tt0816711",
        //  "Type": "movie",
       //   "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
       // }
    //  ];
 //   res.status(200).json({movies}) // Send the movies array as a response
//});

app.post('/api/movies',(req, res)=>{ // Create a post request to /api/movies
    console.log(req.body.title);  // Log the title from the request body

    const {title, year, poster} = req.body; // Destructure the title, year, and poster from the request body
    const newMovie = new movieModel({title, year, poster}); // Create a new movie object
    newMovie.save(); // Save the new movie object
    


    res.send("Movie Added!"); // Send a response
})

app.get('/api/movie/:id', async (req, res) => { // Create a get request to /api/movie/:id
  const movie = await Movie.findById(req.params.id); // Find a movie by id
  res.send(movie); // Send the movie as a response
});



app.listen(port, () => { // Listen on the port for requests
    console.log(`Server is running on http://localhost:${port}`); // Log a message to the console
});