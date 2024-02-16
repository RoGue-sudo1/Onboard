const movieListContainer = document.getElementById("video-list-container");
const videoPlaySection = document.getElementById("video-play-section");
const video = document.querySelector("iframe");
const playButton = document.getElementById("play-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDk5NWNlNjU3Y2I3MmYzNWViMjY0NzE5MmM5MDIyMyIsInN1YiI6IjY1NGEwYjc0NmJlYWVhMDBhYzIxZmJhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pvxc3x7dmBOGCKKFhGtVFQR6fLZ6ewA3-VWrUIg6uJg",
  },
};

const BACKDROP_CDN = "https://image.tmdb.org/t/p/w300/";

const MOVIES_TRAILER_API = "https://api.themoviedb.org/3/movie/";

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

const getMoviesVideo = async (movieId) => {
  const data = await fetch(
    MOVIES_TRAILER_API + movieId + "/videos?language=en-US",
    API_OPTIONS
  );
  const json = await data.json();

  const filterData = json.results.filter((video) => video.type === "Trailer");
  const trailer = filterData.length ? filterData[0] : json.results[0];

  return trailer;
};

const playMovie = async (id, index) => {
  const movieResults = await getPopularMovies();
  const trailer = await getMoviesVideo(id);
  const video = document.createElement("iframe");

  video.src =
    "https://www.youtube.com/embed/" +
    trailer?.key +
    "?&vq=hd1080&autoplay=1&controls=0&&showinfo=0&loop=1";
  video.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ";
  video.title = "YouTube video player";
  video.allowFullscreen = true;
  videoPlaySection.innerHTML = "";
  videoPlaySection.appendChild(video);
  document.cookie = "SameSite=None; Secure";

  videoPlaySection.scrollIntoView({ behavior: "smooth" });
  nextButton.addEventListener("click", () => {
    index++;
    const nextId = movieResults[index].id;
    index < movieResults.length ? playMovie(nextId) : "";
  });

  prevButton.addEventListener("click", () => {
    index--;
    const prevId = movieResults[index].id;
    (index >= 0) ? playMovie(prevId) : "";
  });
  
};

const showingMovies = async () => {
  movieResults = await getPopularMovies();
  movieResults.map((movie, index) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add(`video-container-${index}`);
    const movieImage = document.createElement("img");
    movieImage.classList.add(`video-${index}`);
    const { id, poster_path, title } = movie;
    movieImage.src = `${BACKDROP_CDN}${poster_path}`;
    movieContainer.appendChild(movieImage);
    movieListContainer.appendChild(movieContainer);

    movieContainer.addEventListener("click", () => {
      playMovie(id, index);
    });
  });
};
showingMovies();
