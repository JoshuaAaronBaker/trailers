const key = '70b94eed4a018acf357f21fc77cb0078'

const requests = {
  api_key: `${key}`,
  trending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  generes: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
  horror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  animation: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=animation&page=1&include_adult=false`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  latest: `https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`,
  nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`

}

export default requests;
