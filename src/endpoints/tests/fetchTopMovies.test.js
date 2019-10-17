import fetchTopMovies from '../fetchTopMovies';

it('fetches top movies', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ results: ['movie1', 'movie2', 'movie3'] }),
  }));
  const movies = await fetchTopMovies();
  expect(movies.length).toEqual(3);
  global.fetch.mockRestore();
});

it('throws errors', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject('fetch error'));
  try {
    await fetchTopMovies();
  } catch (e) {
    expect(e).toEqual(new Error('fetch error'));
  }
  global.fetch.mockRestore();
});
