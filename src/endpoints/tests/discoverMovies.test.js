import discoverMovies from '../discoverMovies';


afterEach(() => {
  jest.clearAllMocks();
});

it('fetches top movies', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ total_results: 3, results: ['movie1', 'movie2', 'movie3'] }),
  }));
  const movies = await discoverMovies();
  expect(movies.length).toEqual(3);
  global.fetch.mockRestore();
});

it('fetches the 60 top movies if there are more than 60 results', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ total_results: 130, results: new Array(20).fill('movie') }),
  }));
  const movies = await discoverMovies();
  expect(movies.length).toEqual(60);
  global.fetch.mockRestore();
});

it('generates the correct url from filters', async () => {
  const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({ total_results: 3, results: ['movie1', 'movie2', 'movie3'] }),
  }));
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  const filters = {
    genre: 12,
    maxYear: '1999',
    minYear: '1990',
    maxRating: 'PG-13',
    minRating: 'PG'
  };
  const expectedString = 'https://api.themoviedb.org/3/discover/movie?'
    + 'api_key=undefined&language=en-US&sort_by=popularity.desc&include_adult=false'
    + '&include_video=false&page=1&certification_country=US&with_genres=12'
    + '&release_date.lte=1999-12-31&release_date.gte=1990-01-01&certification.lte=PG-13';
  const expectedOptions = {
    method: 'GET',
    mode: 'cors',
  };
  const movies = await discoverMovies(filters);
  expect(movies.length).toEqual(3);
  expect(mockFetch).toHaveBeenCalledWith(expectedString, expectedOptions)
  global.fetch.mockRestore();
});

it('correctly handles filters with the "Any" value', async () => {
  const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({ total_results: 3, results: ['movie1', 'movie2', 'movie3'] }),
  }));
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  const filters = {
    genre: 12,
    maxYear: '1999',
    minYear: '1990',
    maxRating: 'Any',
    minRating: 'Any'
  };
  const expectedString = 'https://api.themoviedb.org/3/discover/movie?'
    + 'api_key=undefined&language=en-US&sort_by=popularity.desc&include_adult=false'
    + '&include_video=false&page=1&certification_country=US&with_genres=12'
    + '&release_date.lte=1999-12-31&release_date.gte=1990-01-01&certification.lte=R';
  const expectedOptions = {
    method: 'GET',
    mode: 'cors',
  };
  const movies = await discoverMovies(filters);
  expect(movies.length).toEqual(3);
  expect(mockFetch).toHaveBeenCalledWith(expectedString, expectedOptions)
  global.fetch.mockRestore();
});

it('fetches top rated movies when no filters are applied', async () => {
  const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({ total_results: 3, results: ['movie1', 'movie2', 'movie3'] }),
  }));
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  const expectedString = 'https://api.themoviedb.org/3/discover/movie?'
    + 'api_key=undefined&language=en-US&sort_by=popularity.desc&include_adult=false'
    + '&include_video=false&page=1&certification_country=US&certification.lte=R';
  const expectedOptions = {
    method: 'GET',
    mode: 'cors',
  };
  const movies = await discoverMovies();
  expect(movies.length).toEqual(3);
  expect(mockFetch).toHaveBeenCalledWith(expectedString, expectedOptions)
  global.fetch.mockRestore();
});

it('throws errors on unsuccessful resolved promises', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      success: false,
      status_message: 'fetch error',
    }),
  }));
  try {
    await discoverMovies();
  } catch (e) {
    expect(e).toEqual(new Error('fetch error'));
  }
  global.fetch.mockRestore();
});

it('throws errors', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject('fetch error'));
  try {
    await discoverMovies();
  } catch (e) {
    expect(e).toEqual(new Error('fetch error'));
  }
  global.fetch.mockRestore();
});
