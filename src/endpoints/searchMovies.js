const options = {
  method: 'GET',
  mode: 'cors',
};

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}=en-US`
    + `&query=${query}&page=1&include_adult=false`
  try {
    const response = await fetch(url, options);
    const json = await (response.json());
    const results = json.results;
    return results;
  } catch (error) {
    throw new Error(error);
  }
}


export default searchMovies;
