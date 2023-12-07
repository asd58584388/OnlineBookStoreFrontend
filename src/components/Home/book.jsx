import React from 'react';
import { connect } from 'react-redux';
import { NAVIGATE_TO_BOOKINFORMATION_PAGE } from '../redux/actionTypes';
import { getBookReviews } from '../apiService';





const Book = ({ book, navigateToBookInformation }) => {
  const handleClick = () => {

    console.log(book);
    getBookReviews(book.id).then((response) => {
      console.log(response);
      let result ={
        book: book,
        bookReviews:response,
      }
      navigateToBookInformation(result);
    });

  };

  return (
    <li>
      <div onClick={handleClick}>
        <img src={book.volumeInfo.imageLinks.thumbnail} />
        <div>
          <h4>{book.volumeInfo.title}</h4>
        </div>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToBookInformation: (book) =>
      dispatch({ type: NAVIGATE_TO_BOOKINFORMATION_PAGE, payload: book }),
  };
};

export default connect(null, mapDispatchToProps)(Book);
