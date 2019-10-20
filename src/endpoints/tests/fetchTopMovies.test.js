import discoverMovies from '../discoverMovies';

it('fetches top movies', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ results: ['movie1', 'movie2', 'movie3'] }),
  }));
  const movies = await discoverMovies();
  expect(movies.length).toEqual(3);
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
