import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getNewBooks, getNextPage } from "../googlebookapi";
import Book from "./book";
import { CHANGE_BOOKS } from "../redux/actionTypes";
import * as Constants from "../redux/actionTypes";
import BookCategory from "./bookCategory";
import { set } from "lodash";
import book from "./book";

const Home = ({ books }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksIndex, setBooksIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [allBooks, setAllBooks] = useState(books);

    useEffect(() => {
        // console.log("allBooks", allBooks);
        if (allBooks.length === 0) {
            // console.log("init books");

            getNewBooks().then((books) => {
                setAllBooks(books);
                setIsLoading(false);
            });
        }
    }, [allBooks]);

    console.log(allBooks);

    const handleNextPage = () => {
        // console.log("allBooks", allBooks);
        // console.log("booksIndex", booksIndex);

        if (allBooks.length - booksIndex <= 24) {
            // console.log("get new books");
            getNextPage(null,startIndex + 40).then((books) => {
                setAllBooks([...allBooks, ...books]);
                setStartIndex(startIndex + 40);
                setBooksIndex(booksIndex + 12);
                setCurrentPage((prevPage) => prevPage + 1);

                // console.log("currentBooks", currentBooks);
                // console.log("allBooks", allBooks);
            });
        } else {
            setCurrentPage((prevPage) => prevPage + 1);
            setBooksIndex((prevIndex) => prevIndex + 12);
          }
        };
        
        const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
        setBooksIndex((prevIndex) => prevIndex - 12);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <main className="home">
                <h1>Welcome to the Online Book Store</h1>
                <ul>
                    {allBooks.slice(booksIndex, booksIndex + 12).map((book,index) => (
                        <Book key={index} book={book} />
                    ))}
                </ul>
                <div className="pagination-container">
                    {currentPage != 1 ? (
                        <>
                            <button className="pagination-button" onClick={handlePrevPage}>
                                Previous Page
                            </button>
                            {currentPage}
                        </>
                    ) : (
                        <></>
                    )}
                    <button className="pagination-button" onClick={handleNextPage}>Next Page</button>
                </div>
            </main>
        );
    }
};

// function initBooksActionCreator() {
//     return function (dispatch) {
//         getNewBooks().then((books) => {
//             dispatch({ type: Constants.INIT_BOOKS, payload: books });
//         });
//     };
// }

const mapStateToProps = (state) => {
    return {
        books: state.googleBookData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeBooks: (books) =>
            dispatch({ type: CHANGE_BOOKS, payload: books }),
        initBooks: (books) =>
            dispatch({ type: Constants.INIT_BOOKS, payload: books }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
