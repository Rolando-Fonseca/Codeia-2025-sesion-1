import React, { Component } from "react";
import "./App.css";

const API_KEY = "d88757e3c01be1d1fc7fe7965b052910";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES`,
    );
    const data = await response.json();
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image",
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : "0.0",
    }));
  } catch (error) {
    return [];
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], loading: true };
  }

  async componentDidMount() {
    const movies = await fetchMovies();
    this.setState({ movies, loading: false });
  }

  render() {
    return (
      <div>
        {/* Barra de navegación fija */}
        <nav className="navbar">
          <span className="navbar-logo">VERFLIX</span>
        </nav>

        <div className="container main-content">
          <header className="hero">
            <h2>Películas Tendencia</h2>
            <p>Las películas más vistas de esta semana para ti.</p>
          </header>

          {this.state.loading ? (
            <p>Cargando catálogo...</p>
          ) : (
            <div className="movie-grid">
              {this.state.movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-rating">⭐ {movie.rating} Match</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
