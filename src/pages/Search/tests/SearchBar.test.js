import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const handleSearchSpy = jest.fn();

const wrapper = shallow(
  <SearchBar
    handleSearch={handleSearchSpy}
  />,
);

it('should search on form submission', () => {
  const form = wrapper.find(Form);
  form.invoke('onSubmit')({ preventDefault: () => { } });
  expect(handleSearchSpy).toHaveBeenCalled();
});

it('should update the query form on change to search input', () => {
  const searchInput = wrapper.find(FormControl);
  searchInput.invoke('onChange')({ target: { value: 'new query' } });
  const newSearchInput = wrapper.find(FormControl);
  expect(newSearchInput.props().value).toEqual('new query');
});
