import React, { useEffect } from "react";
import * as backendAPI from "../apiService";
import { useState } from "react";
import BookListReviews from "./bookListReviews";
import AddBookListReview from "./addBookListReview";
import { NAVIGATE_TO_BOOKLIST_PAGE ,NAVIGATE_TO_USER_PAGE,NAVIGATE_TO_BOOKINFORMATION_PAGE} from "../redux/actionTypes";
import { connect } from "react-redux";
import { getBookById } from "../googlebookapi";

const SingleBookList = ({ bookList, token, removeWholeBookList,navigateToBookInformation }) => {
    const [booklist, setBooklist] = useState(bookList);
    const [checkedUser, setCheckedUser] = useState(false);
    const [reviews, setReviews] = useState(booklist.reviews);

    const removeBookFromList = (e) => {
        if(e.target.dataset?.type!="button")
        {
            return;
        }
        let bookid = e.target.dataset.id;
        let json = {
            bookid: bookid,
            booklistid: booklist.id,
        };
        backendAPI.removeBookFromList(json, token).then((result) => {
            if (result) {
                let newBookList = booklist.books.filter(
                    (book) => book.bookid != bookid
                );
                setBooklist({ ...booklist, books: newBookList });
            }
        });
    };

    useEffect(() => {
        backendAPI.checkUserBookList(booklist.id, token).then((result) => {
            setCheckedUser(result.isUserBookList);
        });
    }, []);

    const setParentReviews = (reviews) => {
        setReviews(reviews);
    };

    const removeWholeList = (e) => {
        backendAPI.removeWholeBooklist(booklist.id, token).then((result) => {
            if (result) {
                console.log("remove whole booklist");
                removeWholeBookList(booklist.id);
            }
        });
    };

    const goToBookInformation = (e) => {
        e.preventDefault();
        if(e.target.dataset?.type=="bookinfo")
        {
            console.log("bookinfo");
            getBookById(e.target.dataset.id).then((result) => {
                let book={
                    book:result,
                    bookReviews:[]
                }
                console.log(book);

                navigateToBookInformation(book);
            });
        }
    };

    // console.log("reviews",reviews);

    if (booklist.books == undefined || booklist.books.length === 0) {
        return (
            <div className="single-booklist">
                <div className="no-book-message">No Book in this Booklist</div>
                {checkedUser ? (
                    <button className="delete-button" onClick={removeWholeList}>
                        Delete
                    </button>
                ) : (
                    <></>
                )}
            </div>
        );
    } else if (checkedUser == true) {
        return (
            <>
                <div className="single-booklist">
                    <table className="book-table" onClick={removeBookFromList}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Authors</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody onClick={goToBookInformation}>
                            {booklist.books.map((book, index) => (
                                <tr key={index} data-id={book.bookid}>
                                    <td data-type="bookinfo" data-id={book.bookid}>{book.title}</td>
                                    <td>{book.authors.join(", ")}</td>
                                    <td>
                                        <button
                                            className="remove-button"
                                            data-id={book.bookid}
                                            data-type="button"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button className="delete-button" onClick={removeWholeList}>
                    Delete
                </button>

                {booklist.isPublic ? (
                    <>
                        <h2>Reviews</h2>
                        <AddBookListReview
                            booklist={booklist}
                            isLoggedIn={true}
                            token={token}
                            setParentReviews={setParentReviews}
                        />
                    </>
                ) : (
                    <></>
                )}
                {booklist.isPublic ? (
                    reviews.map((review, index) => (
                        <div key={index}>
                            <p>{review.reviewTitle}</p>
                            <p>{review.reviewerName}</p>
                            <p>{review.reviewText}</p>
                            <p>{review.rating}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>This is a Private Booklist</p>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <div className="single-booklist">
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody onClick={goToBookInformation}>
                        {booklist.books.map((book, index) => (
                            <tr key={index} data-id={book.bookid}>
                                <td data-type="bookinfo" data-id={book.bookid}>{book.title}</td>
                                <td>{book.authors.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Reviews</h2>
                <AddBookListReview
                    token={token}
                    booklist={booklist}
                    isLoggedIn={token != ""}
                    setParentReviews={setParentReviews}
                />
                {/* <BookListReviews reviews={reviews} token={token} booklist={booklist} isLoggedIn={token!=""}/> */}
                {reviews.map((review) => {
                    //   console.log(review);
                    return (
                        <div key={review._id}>
                            <p>Title: {review.reviewTitle}</p>
                            <p>Rating: {review.rating}</p>
                            <p>Review: {review.reviewText}</p>
                            <p>Review Name: {review.reviewerName}</p>
                            <p>Review Date: {review.createDate}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeWholeBookList: (booklistID) => {
            dispatch({ type: NAVIGATE_TO_USER_PAGE, payload: booklistID });
        },
        navigateToBookInformation: (book) => {
            dispatch({ type: NAVIGATE_TO_BOOKINFORMATION_PAGE, payload: book });
        }
    };
};

export default connect(null, mapDispatchToProps)(SingleBookList);
