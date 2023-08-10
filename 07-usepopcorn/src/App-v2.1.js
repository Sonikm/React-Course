import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StarRating from "./StarRating";

const API = "bcec72de";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//  Structural components
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("interstellar");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong with your data!");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        // console.error(err.message);

        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setIsLoading(false);
      setError("");
      return;
    }

    handleCloseDetails();
    fetchData();

    // cleanup function(fetching data)
    return () => {
      controller.abort();
    };
  }, [query]);

  function handleSelectMovie(id) {
    setSelectedId((selected) => (selected === id ? null : id));
  }

  function handleCloseDetails() {
    setSelectedId(null);
  }

  function handleWatchedAdd(newMoive) {
    setWatched((watched) => [...watched, newMoive]);

    handleCloseDetails();
  }

  function deleteWatchedMovie(id) {
    // console.log(id);
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NavResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onHandleSelect={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseDetails={handleCloseDetails}
              onHandleWatched={handleWatchedAdd}
              watched={watched}
              movies={movies}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                deleteWatchedMovie={deleteWatchedMovie}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

//  Structural components
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo /> {children}
    </nav>
  );
}
// Presentational Components
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
// Presentational Components
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// Presentational Components
function NavResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// Structural Components
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// State full Components
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// State list Components or Presentational components
function MoviesList({ movies, onHandleSelect }) {
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

function MovieDetails({
  selectedId,
  handleCloseDetails,
  onHandleWatched,
  watched,
  movies,
}) {
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [error, setError] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Actors,
    Genre,
    Plot,
    Poster,
    Released,
    Runtime,
    Title,
    Year,
    imdbRating,
    Director,
  } = movieInfo;


  function handleAdd() {
    const watchedMovie = {
      imdbID: selectedId,
      Title,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ")[0]),
      Poster,
      Year,
      userRating,
    };
    onHandleWatched(watchedMovie);
  }

  const [isTop, setIstop] = useState(imdbRating > 8);
  console.log(isTop);

  useEffect(()=>{
   setIstop(imdbRating > 8);
  }, [imdbRating]);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    async function getMovieDetails() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=bcec72de&i=${selectedId}`
        );

        if (!res.ok) throw new Error("Something went wrong with data...");

        const data = await res.json();
        if (data.Response === "False")
          throw new Error("Something went in loading...");

        setMovieInfo(data);
      } catch (err) {
        setError(err.message);
        // console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();

    return () => {
      setMovieInfo({});
      // console.log("Cleaning movie description...");
    };
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    // Cleanup function
    return () => {
      document.title = "usePopcorn";
      // console.log("Clean up function to change title " + Title);
    };
  }, [Title]);

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        handleCloseDetails();
        // console.log("CLOSED MOVIE...");
      }
    }

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
      // console.log("Cleaning CLOSE MOVIE...");
    };
  }, [handleCloseDetails]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseDetails}>
              &larr;
            </button>
            <img src={Poster} alt={Title} />

            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p style={{ textAlign: "center" }}>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={() => handleAdd()} className="btn-add">
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Number(avgRuntime).toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, deleteWatchedMovie }) {
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
