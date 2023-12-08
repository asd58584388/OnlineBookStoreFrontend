import React, { useState } from 'react';
import { addBookListReview } from '../apiService';
import { connect } from 'react-redux';
import * as Constants from '../redux/actionTypes';

const AddBookListReview = ({booklist,isLoggedIn,token,setParentReviews}) => {
    // const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(isLoggedIn); // Add isLoggedIn state

    // const handleReviewChange = (e) => {
    //     setReview(e.target.value);
    // };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleReviewTitleChange = (e) => {
        setReviewTitle(e.target.value);
    };

    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to submit the review
        let obj={
            id:booklist.id,
            reviewTitle:reviewTitle,
            reviewText:reviewText,
            rating:rating
        }
        addBookListReview(obj,token).then((response) => {
            console.log(response);
            setReviewTitle('');
            setReviewText('');
            setRating('');
            setParentReviews(response.booklist.reviews);
            
        });



    };

    return (
        <div className="review-form">
            {isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={handleRatingChange}
                        min={1}
                        max={5}
                    required/>
                </label>
                <br />
                <label>
                    Review Title:
                    <input
                        type="text"
                        value={reviewTitle}
                        onChange={handleReviewTitleChange}
                    required/>
                </label>
                <br />
                <label>
                    Review Text:
                    <textarea
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    required/>
                </label>
                <br />
                <button type="submit">Submit Review</button>
            </form>
            ) : (
                <div>
                    <p>Please login to submit a review</p>
                </div>
            )}
        </div>
    );
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         navigateToSingleBookList: (booklist) => dispatch({ type: Constants.NAVIGATE_TO_SINGLE_BOOKLIST_PAGE, payload: booklist }),
//     };
// }





// export default connect(null, mapDispatchToProps)(AddBookListReview);
export default AddBookListReview;
