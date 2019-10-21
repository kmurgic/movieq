const options = {
  method: 'GET',
  mode: 'cors',
};

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

async function searchMovies(query) {

  let movies = [];
  let totalResults = 60;
  let page = 1;

  while (movies.length < totalResults) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US`
      + `&query=${query}&page=${page}&include_adult=false`
    try {
      const response = await fetch(url, options);
      const json = await (response.json());
      if (json.success === false) throw json.status_message;
      if (json.total_results < 60) totalResults = json.total_results;
      movies = [...movies, ...json.results];
    } catch (error) {
      throw new Error(error);
    }
  };

  return movies;
};


export default searchMovies;
