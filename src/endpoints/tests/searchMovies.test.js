import searchMovies from '../searchMovies';

it('searches for movies', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ total_results: 3, results: ['movie1', 'movie2', 'movie3'] }),
  }));
  const movies = await searchMovies('foo');
  expect(movies.length).toEqual(3);
  global.fetch.mockRestore();
});

it('searches for the 60 top movies if there are more than 60 results', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ total_results: 76, results: new Array(20).fill('movie') }),
  }));
  const movies = await searchMovies();
  expect(movies.length).toEqual(60);
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
    await searchMovies('foo');
  } catch (e) {
    expect(e).toEqual(new Error('fetch error'));
  }
  global.fetch.mockRestore();
});

it('throws errors on rejected promise', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject('fetch error'));
  try {
    await searchMovies('foo');
  } catch (e) {
    expect(e).toEqual(new Error('fetch error'));
  }
  global.fetch.mockRestore();
});
