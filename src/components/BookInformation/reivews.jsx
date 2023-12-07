import React, { useState } from "react";
import { addBookReview } from "../apiService";

const Reviews = ({ reviews, token, book }) => {
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviewTitle, setReviewTitle] = useState(""); // Added reviewTitle state

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
        addBookReview(newReview,token).then((response) => {
            console.log(response);
        });
        console.log("Review submitted");
    };

    return (
        <div>
            <div className="reviews-section">
                <h2>Reviews</h2>
                {token !== "" ? (
                    <form onSubmit={handleSubmit} className="review-form">
                        <label>
                            Rating:
                            <input
                                type="number"
                                value={rating}
                                onChange={handleRatingChange}
                                min={1}
                                max={5}
                            />
                        </label>
                        <br />
                        <label>
                            Review Title:
                            <input
                                type="text"
                                value={reviewTitle}
                                onChange={handleReviewTitleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Review Text:
                            <textarea
                                value={reviewText}
                                onChange={handleReviewTextChange}
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
            </div>
            {reviews.map((review) => {
            //   console.log(review);
                return (
                    <div className="single-review" key={review._id}>
                        <p>Title: {review.reviewTitle}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.reviewText}</p>
                        <p>Review Name: {review.reviewerName}</p>
                        <p>Review Date: {review.createdAt}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Reviews;
