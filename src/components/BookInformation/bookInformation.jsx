import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as backendAPI from '../apiService';
import AddToCart from './addToCart';
import Reviews from './reivews';
import AddToBookList from './addToBookList';
import { RETURN } from '../redux/actionTypes';
import { useLocation, useNavigate } from 'react-router-dom';

const BookInformation = ({ book, token, reviews, isLoggedIn, userBookLists }) => {
    const navigate = useNavigate();

    // const goBack = () => {
    //     navigate(-1);
    // };


    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-container">
            <div className="book-item">
                <img className="book-image" src={book.volumeInfo.imageLinks.thumbnail} />
                <div className="book-details">
                    <h1 className="book-title">Title:{book.volumeInfo.title}</h1>
                    <p className="book-meta">Categories:{book.volumeInfo.categories}</p>
                    <p className="book-meta">Authors:{book.volumeInfo.authors.join(', ')}</p>
                    <p className="book-description">Description:{book.volumeInfo.description}</p>
                    {book.saleInfo.saleability === 'FOR_SALE_AND_RENTAL' ||
                    book.saleInfo.saleability === 'FOR_SALE' ? (
                        <p className="retail-price">Retail Price:{book.saleInfo.retailPrice.amount}</p>
                    ) : (
                        <></>
                    )}
                    {isLoggedIn ? (
                        <div className="button-row">
                            <AddToCart
                                isForSale={
                                    book.saleInfo.saleability === 'FOR_SALE_AND_RENTAL' ||
                                    book.saleInfo.saleability === 'FOR_SALE'
                                }
                                book={book}
                                token={token}
                            />
                            <AddToBookList book={book} token={token} userBookLists={userBookLists} />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Reviews reviews={reviews} token={token} book={book} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    book: state.book,
    token: state.token,
    reviews: state.bookReviews,
    isLoggedIn: state.isLoggedIn,
    userBookLists: state.userBookLists,
    // prevPage: state.prevPage,
});

const mapDispatchToProps = (dispatch) => ({
    // handleReturn: (page) => dispatch({ type: RETURN, returnPage:page }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookInformation);
