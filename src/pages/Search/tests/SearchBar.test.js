import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';
import Form from 'react-bootstrap/Form';

const handleSearchSpy = jest.fn();

const wrapper = shallow(
  <SearchBar
    handleSearch={handleSearchSpy}
  />,
);

it('should search on form submission', () => {
  const form = wrapper.find(Form);
  form.invoke('onSubmit')();
  expect(handleSearchSpy).toHaveBeenCalled();
});
