import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext } from "react-beautiful-dnd";
import Queue from '../Queue';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

/* Not wrapping state changes in act - enzyme automatically wraps */
/* See enzyme github page https://github.com/airbnb/enzyme#reacttestutilsact-wrap */

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
const mockChangeQueue = jest.fn();
let wrapper;

beforeEach(() => {
  // mount because of react-beatiful-dnd droppable
  wrapper = mount(
    <Queue
      changeQueue={mockChangeQueue}
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

it('renders a form instead of an h2 when edit button is clicked', () => {
  const editButton = wrapper.find(Button).at(0);
  editButton.invoke('onClick')();
  expect(wrapper.find(Form).length).toEqual(1);
  expect(wrapper.find('h2').length).toEqual(0);
});

it('changes the value of the input properly', () => {
  const editButton = wrapper.find(Button).at(0);
  editButton.invoke('onClick')();
  const nameChange = wrapper.find(FormControl);
  nameChange.invoke('onChange')({ target: { value: 'new value' } });
  const newNameChange = wrapper.find(FormControl);
  expect(newNameChange.props().value).toEqual('new value');
});

it('closes the form and changes the name on form submission', () => {
  const editButton = wrapper.find(Button).at(0);
  editButton.invoke('onClick')();
  const nameChange = wrapper.find(FormControl);
  nameChange.invoke('onChange')({ target: { value: 'new name' } });
  const form = wrapper.find(Form);
  form.invoke('onSubmit')({ preventDefault: () => { } });
  expect(wrapper.find(Form).length).toEqual(0);
  expect(wrapper.find('h2').length).toEqual(1);
  expect(mockChangeQueue).toHaveBeenCalledWith({ name: 'new name' });
});

