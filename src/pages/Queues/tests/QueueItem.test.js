import React from 'react';
import { shallow } from 'enzyme';
import QueueItem from '../Queue';

let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <QueueItem
      id={3}
      index={2}
      posterSrc="some.url"
      title="Test Title"
      variant="info"
    />
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders without crashing', () => {
  expect(wrapper);
});
