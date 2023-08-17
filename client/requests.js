const key = process.env.MOVIEDB_API_KEY;

const requests = {
  api_key: `${key}`,
  trending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  generes: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
  horror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
  comedy: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`,
  animation: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=16`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  latest: `https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`,
  nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
  action: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
  adventure: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=12`,
  crime: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=80`,
  drama: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=18`,
  family: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10751`,
  fantasy: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=14`,
  scifi: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=878`,
  tvMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10770`,
  thriller: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=53`,
  mystery: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=9648`,
  music: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10402`,
  romance: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`,
  war: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10752`
};

export default requests;
