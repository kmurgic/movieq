import React from 'react';
import { shallow } from 'enzyme';
import QueueItem from '../QueueItem';

let wrapper;
const mockRemoveFromQueue = jest.fn();

beforeEach(() => {
  wrapper = shallow(
    <QueueItem
      id={3}
      index={2}
      posterSrc="some.url"
      removeFromQueue={mockRemoveFromQueue}
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
