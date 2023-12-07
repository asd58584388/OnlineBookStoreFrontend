import React, { useState } from "react";
import AddBookListReview from "./addBookListReview";

const BookListReviews = ({ reviews, token, booklist, isLoggedIn }) => {

    return (
        <div>
            <h2>Reviews</h2>
            {
            <AddBookListReview
                token={token}
                booklist={booklist}
                isLoggedIn={isLoggedIn}
            />
            }
            {reviews.map((review) => {
                //   console.log(review);
                return (
                    <div key={review._id}>
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

export default BookListReviews;
