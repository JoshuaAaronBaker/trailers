const key = process.env.MOVIEDB_API_KEY;

const requests = {
  api_key: `${key}`,
  trending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  generes: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
  horror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  comedy: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  animation: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=animation&page=1&include_adult=false`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  latest: `https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`,
  nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
  action: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=action&page=1&include_adult=false`,
  adventure: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=adventure&page=1&include_adult=false`,
  documentary: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=documentary&page=1&include_adult=false`,
  drama: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=drama&page=1&include_adult=false`,
  family: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=family&page=1&include_adult=false`,
  fantasy: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=fantasy&page=1&include_adult=false`,
  history: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=history&page=1&include_adult=false`,
  thriller: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=thriller&page=1&include_adult=false`,
  mystery: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=mystery&page=1&include_adult=false`,
  music: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=music&page=1&include_adult=false`,
  scifi: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=science_fiction&page=1&include_adult=false`,
  war: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=war&page=1&include_adult=false`,
  anime: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=anime&page=1&include_adult=false`
};

export default requests;
