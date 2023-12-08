import React, { useState } from "react";
import { addBookReview } from "../apiService";

const Reviews = ({ reviews, token, book }) => {
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewTitle, setReviewTitle] = useState(""); // Added reviewTitle state
    const [bookReviews, setBookReviews] = useState(reviews);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleReviewTitleChange = (e) => {
        // Added handleReviewTitleChange function
        setReviewTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newReview = {
            bookId: book.id,
            rating: rating,
            reviewText: reviewText,
            reviewTitle: reviewTitle,
        };
        addBookReview(newReview, token).then((response) => {
            console.log(response);
            setBookReviews([...bookReviews, response.review]);
            console.log("Review submitted");
        });
    };

    return (
        <div>
            <div className="reviews-section">
                <h2>Reviews</h2>
                {token !== "" ? (
                    <form onSubmit={handleSubmit} className="review-form">
                        <label>
                            <b>Rating: </b>
                            <input
                                type="number"
                                value={rating}
                                onChange={handleRatingChange}
                                min={1}
                                max={5}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            <b>Review Title:</b>
                            <input
                                type="text"
                                value={reviewTitle}
                                onChange={handleReviewTitleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            <b>Review Text:</b>
                            <textarea
                                value={reviewText}
                                onChange={handleReviewTextChange}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit">Submit Review</button>
                    </form>
                ) : (
                    <div>
                        <p>Please login to submit a review</p>
                    </div>
                )}
                {bookReviews.map((review, index) => {
                    //   console.log(review);
                    return (
                        <div className="single-review" key={index}>
                            <p>
                                <b>Title: </b>
                                {review.reviewTitle}
                            </p>
                            <p>
                                <b>Rating: </b>
                                {review.rating}
                            </p>
                            <p>
                                <b>Review: </b>
                                {review.reviewText}
                            </p>
                            <p>
                                <b>Reviewer Name: </b>
                                {review.reviewerName}
                            </p>
                            <p>
                                <b>Review Date: </b>
                                {review.createdAt}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Reviews;
