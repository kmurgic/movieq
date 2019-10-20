const options = {
  method: 'GET',
  mode: 'cors',
};

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

async function discoverMovies(filters = {}) {
  Object.keys(filters).forEach(key => {
    if (filters[key] === 'Any') filters[key] = null;
  });
  const { genre, maxYear, minYear, maxRating } = filters;

  const genreParam = genre ? `&with_genres=${genre}` : '';
  const maxYearParam = maxYear ? `&release_date.lte=${maxYear}-12-31` : '';
  const minYearParam = minYear ? `&release_date.gte=${minYear}-01-01` : '';
  const maxRatingParam = maxRating ? `&certification.lte=${maxRating}` : '&certification.lte=R';

  const queryString = `${genreParam}${maxYearParam}${minYearParam}${maxRatingParam}`;

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
    + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false'
    + `&page=1&certification_country=US${queryString}`;

  try {
    const response = await fetch(url, options);
    const json = await (response.json());
    if (json.success === false) throw json.status_message;
    const results = json.results;
    return results;
  } catch (error) {
    throw new Error(error);
  }
}


export default discoverMovies;
