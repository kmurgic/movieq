import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import classes from './index.module.css'
import { queueItemAdd, notificationAdd } from '../../actions/';

const MovieCard = props => {
  const { movieId, overview, posterPath, releaseDate, title } = props;
  const dispatch = useDispatch();
  const queues = useSelector(state => state.queues.queueList);

  const releaseYear = releaseDate.slice(0, 4);
  const lastCharacterBeforePunctuationOrSpace = /[\w'"][:.\s,!?-](?!.*[\w'"][:.\s,!?-])/
  const clipOverviewIndex = (overview.slice(0, 140)).search(
    lastCharacterBeforePunctuationOrSpace) + 1;
  const clippedOverview = `${overview.slice(0, clipOverviewIndex)}...`;
  const imageBasePath = 'https://image.tmdb.org/t/p/w200/'
  const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
  const posterSrc = posterPath ? `${imageBasePath}${posterPath}` : fallbackImage;
  const cardTitleText = `${title}${releaseYear ? ` (${releaseYear})` : ''}`;

  const movie = { id: movieId, posterSrc, title: cardTitleText };
  const handleAddToQueueClick = () => {
    const { movies } = queues[0];
    // Avoid adding a movie to a list twice!
    if (movies.find(movie => movie.id === movieId)) {
      const duplicateMessage = 'Movie is already in queue';
      dispatch(notificationAdd('Oops', duplicateMessage, 'secondary'));
      return;
    }
    const successMessage = 'Movie Added To Queue';
    dispatch(notificationAdd('Success', successMessage, 'success'));
    dispatch(queueItemAdd(1, movie));
  };

  return (
    <Card className={`${classes.card} mb-4 d-flex-inline shadow`}>
      <Row className="h-100">
        <Card.Img className="h-100 col-sm-6 pr-sm-0" variant="top" src={posterSrc} />
        <Card.Body
          className="d-flex flex-column justify-content-between h-100 col-sm-6"
        >
          <div className="mr-2 ml-2">
            <Card.Title>
              {cardTitleText}
            </Card.Title>
            <Card.Text>
              {clippedOverview}
            </Card.Text>
          </div>
          <Button
            className='mt-4 align-self-start ml-2'
            onClick={handleAddToQueueClick}
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
  movieId: PropTypes.number.isRequired,
  overview: PropTypes.string,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
}

export default MovieCard;
