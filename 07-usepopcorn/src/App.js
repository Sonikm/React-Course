import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedMoviesList from "./components/WatchedMoviesList";
import NavBar, { Search, NavResult } from "./components/NavBar";
import WatchedSummary from "./components/WatchedSummary";
import MoviesList from "./components/MoviesList";

const API = "bcec72de";

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
        console.error(err.message);

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
    console.log(id);
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
