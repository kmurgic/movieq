## Movie Q

MovieQ is a web application that allows users to create and organize queues of movies they wish to watch. Users can search for their favorite films or explore new options by browsing through tens of thousands of movies that can be sorted by genre, rating, and year of release. 

<img src='/public/movieQScreenShot.png' width='850px' height='459px' alt='screenshot'/>

## Built With

* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Redux](https://redux.js.org/)
* [React Router](https://reacttraining.com/react-router/core/guides/philosophy)
* [Redux-Saga] (https://redux-saga.js.org/)
* [React-Beautiful-DnD] (https://github.com/atlassian/react-beautiful-dnd)
* [React-Bootstrap] (https://react-bootstrap.github.io/)

## Features

*	The “Discover” page helps users to explore a vast database of movies according to their preferences for genre, rating, and year of release - all of which can be controlled via the drop-down menus at the top of the page.  

* The “Search” page allows users to search for specific films by title. Search results yield exact matches as well as close matches. 

*	From both the “Discover” and “Search” pages, users are able to add titles to any of their existing queues. When an attempt to add a movie to a queue is made, a message pops up to inform the user that the movie has either successfully been added to the queue or is already present in the selected queue. One movie cannot be added to the same queue twice.

*	The “My Queues” page is where users can create and edit their queues. 

  *	The [+] button next to the page title (“My Queues”) allows users to add new queues. 
  *	The trash can symbol in the top left corner of each queue allows users to remove existing queues. 
  *	By clicking the edit pencil to the right of a queue title, users can enter a new queue title, and save their changes by clicking the “save” button that replaces the edit pencil. 
  *	Users can rearrange the order of the movies in their queues by dragging and dropping the thumbnail to the desired location


## Future Updates

* A back end service will be added to this project, allowing users to create an account, sign in, and save their queues.
* Users will be able to utilize drag and drop functionality rearrange the order of their queue lists.
* A dialog with a helpful warning will appear if users click the remove button on a queue lists.
* Users will be able to paginate through hundreds of pages of movies on the discover page.
* Users will be able to rate movies and view the ratings of other users.
* Users will be able to choose to make their queues public and view the queues of other users.
