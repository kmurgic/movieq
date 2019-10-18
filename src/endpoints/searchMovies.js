const apiKey = process.env.REACT_APP_TMDB_API_KEY;

async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US`
    + `&query=${query}&page1&include_adult=false`
  try {
    const response = await fetch(url);
    const json = await (response.json());
    if (json.success === false) throw json.status_message;
    const results = json.results;
    return results;
  } catch (e) {
    throw new Error(e);
  }
}


export default searchMovies;
