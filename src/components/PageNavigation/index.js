import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import './index.css';

const PageNavigation = props => {
  const { page, setPage, totalPages } = props;
  const items = [];
  items.push(
    <Pagination.First
      disabled={page <= 1}
      onClick={() => setPage(1)}
    />
  );
  items.push(
    <Pagination.Prev
      disabled={page <= 1}
      onClick={() => setPage(prevPage => prevPage - 1)}
    />
  );
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        key={number}
        active={number === page}>
        {number}
      </Pagination.Item>,
    );
  }
  items.push(
    <Pagination.Next
      disabled={page >= totalPages}
      onClick={() => setPage(prevPage => prevPage + 1)}
    />
  );
  items.push(
    <Pagination.Last
      disabled={page >= totalPages}
      onClick={() => setPage(totalPages)}
    />
  );
  return (
    <Pagination
      className="justify-content-center"
      size="lg"
    >
      {items}
    </Pagination>
  )
}

PageNavigation.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default PageNavigation;
