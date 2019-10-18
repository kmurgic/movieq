import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from '../index';
import Card from 'react-bootstrap/Card';

const wrapper = shallow(
  <MovieCard
    overview={'This is a long block of text that needs to be clipped to become a shorter'
      + 'block of text that ends at the end of a word and then follwed by, an ellipsis'}
    posterPath="testpath.url"
    releaseDate="2020-04-16"
    title="Movie Title"
  />,
);

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