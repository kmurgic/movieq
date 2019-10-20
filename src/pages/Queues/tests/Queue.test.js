import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext } from "react-beautiful-dnd";
import Queue from '../Queue';

const mockMovieList = [{
  id: 1,
  posterSrc: 'some.url',
  title: 'Title 1',
}, {
  id: 2,
  posterSrc: 'some.url',
  title: 'Title 2',
}, {
  id: 3,
  posterSrc: 'some.url',
  title: 'Title 3',
}];

const mockReorder = jest.fn();
let wrapper;

beforeEach(() => {
  wrapper = mount(
    <Queue
      movies={mockMovieList}
      name="Test Queue"
      reorder={mockReorder}
      getRemoveFromQueueFunction={() => () => { }}
    />
  );
});

afterEach(() => {
  jest.clearAllMocks();
  wrapper.unmount();
});

it('reorders on drag end inside droppable', () => {
  const dragDropContext = wrapper.find(DragDropContext);
  dragDropContext.invoke('onDragEnd')({
    destination: { index: 1 },
    source: { index: 3 },
  });
  expect(mockReorder).toHaveBeenCalledWith(3, 1);
});

it('does not reorder on drag end outside droppable', () => {
  const dragDropContext = wrapper.find(DragDropContext);
  dragDropContext.invoke('onDragEnd')({
    destination: null,
    source: { index: 3 },
  });
  expect(mockReorder).not.toHaveBeenCalled();
});
