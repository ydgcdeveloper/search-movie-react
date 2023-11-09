import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";

export const MovieSearcher = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "773584b97ecb87150e3b41614824f797";

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch(
        `${urlBase}?query=${search
          .toString()
          .replace(" ", "+")}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
      setFetchError(null);
      console.log(movies);
      setIsLoadingData(false);
    } catch (error) {
      setFetchError(error.message);
      setIsLoadingData(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Searcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a movie name"
          value={search}
          onChange={handleInputChange}
        ></input>
        <button type="submit" className="search-button">
          Search
          <ImSpinner6
            visibility={isLoadingData ? "visble" : "hidden"}
            className="spinner rotate"
          ></ImSpinner6>
        </button>
      </form>
      {fetchError && <h3 className="error">{fetchError}</h3>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
