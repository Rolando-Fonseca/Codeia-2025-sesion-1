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
              {this.state.movies.map(movie => (
                <div key={movie.id} className="movie-card">
                  <img src={movie.poster} alt={movie.title} className="movie-poster" />
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