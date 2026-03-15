import React, { Component } from "react";

// --- LÓGICA DE LA API (Integrada para evitar errores de importación) ---
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

// --- COMPONENTE PRINCIPAL ---
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
      <div
        style={{
          backgroundColor: "#141414",
          color: "white",
          minHeight: "100vh",
          padding: "20px",
          fontFamily: "Arial",
        }}
      >
        <h1 style={{ color: "#E50914" }}>VERFLIX</h1>
        {this.state.loading ? (
          <p>Cargando películas...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {this.state.movies.map((movie) => (
              <div key={movie.id} style={{ textAlign: "center" }}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {movie.title}
                </p>
                <span style={{ color: "#46d369" }}>⭐ {movie.rating}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
