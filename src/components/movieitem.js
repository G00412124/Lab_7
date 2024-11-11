import { useEffect } from "react"; // Import the useEffect hook from react
import Card from 'react-bootstrap/Card'; // Import the Card component from react-bootstrap

const MovieItem = (props)=> { // Define a functional component called MovieItem that takes a prop called mymovie
  useEffect(() => { // Use an effect hook to log the mymovie prop to the console
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

  return ( // Return a card with the movie title, year, and poster
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header> 
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieItem; // Export the MovieItem component