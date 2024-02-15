const movieContainer = document.getElementById("video-container");

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDk5NWNlNjU3Y2I3MmYzNWViMjY0NzE5MmM5MDIyMyIsInN1YiI6IjY1NGEwYjc0NmJlYWVhMDBhYzIxZmJhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pvxc3x7dmBOGCKKFhGtVFQR6fLZ6ewA3-VWrUIg6uJg",
  },
};

const BACKDROP_CDN = "https://image.tmdb.org/t/p/w300";

let movieResults;
const getPopularMovies = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    API_OPTIONS
  );
  const json = await data.json();
  console.log(json.results);
  return json.results;
};

const showingMovies = async () => {
  movieResults = await getPopularMovies();
  movieResults.map((movie) => {
    const movieImage = document.createElement("img");
    const backdrop = movie.backdrop_path
    movieImage.src = `${BACKDROP_CDN}+${backdrop}`;
    movieContainer.appendChild(movieImage);
    // movieContainer.appendChild(document.createElement("img"),{src:`${BACKDROP_CDN}+${movie.backdrop_path}`})
  });
};
showingMovies();
