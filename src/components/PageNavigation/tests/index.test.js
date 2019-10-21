import React from 'react';
import { shallow } from 'enzyme';
import Pagination from 'react-bootstrap/Pagination'
import PageNavigation from '../index';

let mockSetPage;
let wrapper;

beforeEach(() => {
  mockSetPage = jest.fn();
  wrapper = shallow(
    <PageNavigation
      page={3}
      setPage={mockSetPage}
      totalPages={5}
    />
  );
})

afterEach(() => {
  mockSetPage.mockClear();
});

it('renders with five page numbers', () => {
  const pageItems = wrapper.find(Pagination.Item);
  expect(pageItems.length).toEqual(5);
});

it('the pages numbers direct to the correct place', () => {
  wrapper.find(Pagination.Item).forEach((pageItem, index) => {
    pageItem.invoke('onClick')();
    expect(mockSetPage).toHaveBeenCalledWith(index + 1);
  });
});

it('the pages numbers are active at the correct times', () => {
  wrapper.setProps({ page: 1 });
  const firstPageItem = wrapper.find(Pagination.Item).at(0);
  const secondPageItem = wrapper.find(Pagination.Item).at(1);
  expect(firstPageItem.props().active).toEqual(true);
  expect(secondPageItem.props().active).toEqual(false);
  wrapper.setProps({ page: 2 });
  const newFirstPageItem = wrapper.find(Pagination.Item).at(0);
  const newSecondPageItem = wrapper.find(Pagination.Item).at(1);
  expect(newFirstPageItem.props().active).toEqual(false);
  expect(newSecondPageItem.props().active).toEqual(true);
});

it('the forward, back, first page and last page buttons work properly', () => {
  const prevPage = wrapper.find(Pagination.Prev);
  prevPage.invoke('onClick')();
  expect(mockSetPage).toHaveBeenCalled();
  const nextPage = wrapper.find(Pagination.Next);
  nextPage.invoke('onClick')();
  expect(mockSetPage).toHaveBeenCalledTimes(2);
  const firstPage = wrapper.find(Pagination.First);
  firstPage.invoke('onClick')();
  expect(mockSetPage).toHaveBeenCalledWith(1);
  const lastPage = wrapper.find(Pagination.Last);
  lastPage.invoke('onClick')();
  expect(mockSetPage).toHaveBeenCalledWith(5);
});

it('the forward, back, first page and last page buttons should be disabled at the appropriate time', () => {
  wrapper.setProps({ page: 1 });
  const prevPage = wrapper.find(Pagination.Prev);
  const nextPage = wrapper.find(Pagination.Next);
  const firstPage = wrapper.find(Pagination.First);
  const lastPage = wrapper.find(Pagination.Last);
  expect(prevPage.props().disabled).toEqual(true);
  expect(firstPage.props().disabled).toEqual(true);
  expect(nextPage.props().disabled).toEqual(false);
  expect(lastPage.props().disabled).toEqual(false);
  wrapper.setProps({ page: 5 });
  const newPrevPage = wrapper.find(Pagination.Prev);
  const newNextPage = wrapper.find(Pagination.Next);
  const newFirstPage = wrapper.find(Pagination.First);
  const newLastPage = wrapper.find(Pagination.Last);
  expect(newPrevPage.props().disabled).toEqual(false);
  expect(newFirstPage.props().disabled).toEqual(false);
  expect(newNextPage.props().disabled).toEqual(true);
  expect(newLastPage.props().disabled).toEqual(true);
  wrapper.setProps({ page: 5 });
});
