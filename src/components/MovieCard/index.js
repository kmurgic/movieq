import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import classes from './index.module.css'

const MovieCard = props => {
  const { overview, posterPath, releaseDate, title } = props;
  const releaseYear = releaseDate.slice(0, 4);
  const lastCharacterBeforePunctuationOrSpace = /[\w'"][:.\s,!?-](?!.*[\w'"][:.\s,!?-])/
  const clipOverviewIndex = (overview.slice(0, 140)).search(
    lastCharacterBeforePunctuationOrSpace) + 1;
  const clippedOverview = `${overview.slice(0, clipOverviewIndex)}...`;
  const imageBasePath = 'https://image.tmdb.org/t/p/w200/'

  return (
    <Card className={`${classes.card} mb-4 d-flex-inline shadow`}>
      <Row className="h-100">
        <Card.Img className="h-100 col-sm-6 pr-sm-0" variant="top" src={`${imageBasePath}${posterPath}`} />
        <Card.Body
          className="d-flex flex-column justify-content-between h-100 col-sm-6"
        >
          <div className="mr-2 ml-2">
            <Card.Title>
              {`${title}${releaseYear ? ` (${releaseYear})` : ''}`}
            </Card.Title>
            <Card.Text>
              {clippedOverview}
            </Card.Text>
          </div>
          <Button
            className='mt-4 align-self-start ml-2'
            variant="outline-secondary"
          >
            Add to Queue
          </Button>
        </Card.Body>
      </Row>
    </Card>
  )
}

MovieCard.defaultProps = {
  overview: 'No description.',
  posterPath: '',
  releaseDate: '',
  title: 'Untitled',
}

MovieCard.propTypes = {
  overview: PropTypes.string,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
}

export default MovieCard;
