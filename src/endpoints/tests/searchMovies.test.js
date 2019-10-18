import searchMovies from '../searchMovies';

it('searches for movies', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ results: ['movie1', 'movie2', 'movie3'] }),
  }));
  const movies = await searchMovies('foo');
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
