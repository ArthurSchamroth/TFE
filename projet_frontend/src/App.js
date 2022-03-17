import './App.css';
import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);

  useEffect(() => {
    console.log(token);
    if(!token['mr-token']) window.location.href = "/";
}, [token])

  const updatedMovie = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id){
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const logoutUser = () => {
    deleteToken(["mr-token"]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm}/>
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout">
        <div>
          <button onClick={newMovie}>New movie</button>
        </div>
        </div>
    </div>
  );
}

export default App;
