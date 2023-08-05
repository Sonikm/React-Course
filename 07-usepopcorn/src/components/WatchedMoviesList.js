
export default function WatchedMoviesList({ watched, deleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          deleteWatchedMovie={deleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, deleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>

        <button
          onClick={() => deleteWatchedMovie(movie.imdbID)}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}
