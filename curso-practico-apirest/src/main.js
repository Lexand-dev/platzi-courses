const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  params: {
    api_key: "3c333f59f945c9718cf75ad20f0e5875",
    language: "es-ES",
  },
});

//Utils
function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    container.appendChild(movieContainer);
    movieContainer.appendChild(movieImg);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";
  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    container.appendChild(categoryContainer); // container
    categoryContainer.appendChild(categoryTitle);
    categoryTitle.appendChild(categoryTitleText);
  });
}

//Llamadas al API

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoryMoviesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

/* getTrendingMoviesPreview();
getCategoryMoviesPreview();
getMoviesByCategory(); */