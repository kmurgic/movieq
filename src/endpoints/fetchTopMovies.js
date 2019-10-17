const options = {
  method: 'GET',
  mode: 'cors',
};

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

async function fetchTopMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
    + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false'
    + '&page=1';

  try {
    const response = await fetch(url, options);
    const json = await (response.json());
    const results = json.results;
    return results;
  } catch (error) {
    throw new Error(error);
  }
}


export default fetchTopMovies;
