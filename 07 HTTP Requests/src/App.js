import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie'
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const url = 'https://react-httpreq-demo-default-rtdb.firebaseio.com/movies.json'

  

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Something went wrong!!!')
      }

      const data = await response.json()
      
      // const transformedMovies = data.results.map(movie => {
      //   return {
      //     id: movie.episode_id,
      //     title: movie.title,
      //     releaseDate: movie.release_date,
      //     openingText: movie.opening_crawl
      //   }
      // })

      // const transformedMovies = Object.keys(data)[0]
            
      // setMovies(transformedMovies)

      const keys = Object.keys(data)

      const movieList = keys.map(key => {
        return {...data[key], id:key}
      })

      setMovies(movieList)

    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)   
  },[])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])


  async function addMovieHandler (movie) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    fetchMoviesHandler()
  }
  
  let content = <p>No movies found =(</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
