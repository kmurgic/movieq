import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from '../index';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { notificationAdd } from '../../../actions';
const mockMovieList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const mockState = {
  queues: {
    queueList: [{
      id: 1,
      movies: mockMovieList,
      name: 'Watchlist',
    }],
  },
  notifications: {
    nextId: 2,
  }
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
  useSelector: fn => fn(mockState),
}));

const wrapper = shallow(
  <MovieCard
    movieId={1}
    overview={'This is a long block of text that needs to be clipped to become a shorter'
      + 'block of text that ends at the end of a word and then follwed by, an ellipsis'}
    posterPath="testpath.url"
    releaseDate="2020-04-16"
    title="Movie Title"
  />,
);

afterEach(() => {
  jest.clearAllMocks();
});

it('should render a clipped version of the overview', () => {
  const expectedClippedOverview = 'This is a long block of text that needs to be clipped to become a shorter'
    + 'block of text that ends at the end of a word and then follwed by...';
  const cardText = wrapper.find(Card.Text);
  const textInCardText = cardText.props().children;
  expect(textInCardText).toEqual(expectedClippedOverview);
});

it('should render the title with the release year', () => {
  const expectedCardTitle = 'Movie Title (2020)'
  const cardTitle = wrapper.find(Card.Title);
  const textInCardTitle = cardTitle.props().children;
  expect(textInCardTitle).toEqual(expectedCardTitle);
});

it('should render the title only if not passed a release year', () => {
  wrapper.setProps({ releaseDate: undefined });
  const expectedCardTitle = 'Movie Title';
  const cardTitle = wrapper.find(Card.Title);
  const textInCardTitle = cardTitle.props().children;
  expect(textInCardTitle).toEqual(expectedCardTitle);
});

it('should render with a fallback image if not passed a poster_path', () => {
  wrapper.setProps({ posterPath: null });
  const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
  const cardImage = wrapper.find(Card.Img);
  const cardImageSrc = cardImage.props().src;
  expect(cardImageSrc).toEqual(fallbackImage);
});

it('should dispatch the proper notification when movie is already in list', () => {
  const addToFirstQueue = wrapper.find(Dropdown.Item).at(0);
  addToFirstQueue.invoke('onClick')();
  const expectedAction = notificationAdd('Oops!', 'Movie Title is already in Watchlist', 'secondary', 2);
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('should dispatch add queue item and add notification actions for a new movie', () => {
  wrapper.setProps({ movieId: 53 });
  const addToFirstQueue = wrapper.find(Dropdown.Item).at(0);
  addToFirstQueue.invoke('onClick')();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
