// State list Components or Presentational components
export default function MoviesList({ movies, onHandleSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies
          movie={movie}
          key={movie.imdbID}
          onHandleSelect={onHandleSelect}
        />
      ))}
    </ul>
  );
}
// Presentational components
function Movies({ movie, onHandleSelect }) {
  return (
    <li key={movie.imdbID} onClick={() => onHandleSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
