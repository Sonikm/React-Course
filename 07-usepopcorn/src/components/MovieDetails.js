import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({
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
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();

    return () => {
      setMovieInfo({});
      console.log("Cleaning movie description...");
    };
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    // Cleanup function
    return () => {
      document.title = "usePopcorn";
      console.log("Clean up function to change title " + Title);
    };
  }, [Title]);

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        handleCloseDetails();
        console.log("CLOSED MOVIE...");
      }
    }

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
      console.log("Cleaning CLOSE MOVIE...");
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
