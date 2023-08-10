import { useState, useEffect } from "react";

const KEY = "bcec72de";

export function useMovies(query, callBack){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        callBack?.();

        const controller = new AbortController();
    
        async function fetchData() {
          try {
            setIsLoading(true);
            setError("");
    
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
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
    
        // handleCloseDetails();
        fetchData();
    
        // cleanup function(fetching data)
        return () => {
          controller.abort();
        };
      }, [query]);

      return {movies, isLoading, error};
}