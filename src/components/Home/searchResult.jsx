import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getNewBooks, getNextPage, getNextPageByURL } from "../googlebookapi";
import Book from "./book";
import { CHANGE_BOOKS } from "../redux/actionTypes";
import * as Constants from "../redux/actionTypes";

const SearchResult = ({ books, url,emptyBooks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [booksIndex, setBooksIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [allBooks, setAllBooks] = useState(books);
    const [empty, setEmpty] = useState(emptyBooks);


    useEffect(() => {
        console.log("books", books);
        console.log("emptyBooks", emptyBooks);
        console.log("empty", empty);
        console.log("allBooks", allBooks);
        // console.log("emptyBooks", emptyBooks);
        if(emptyBooks==true || empty==true){
            setAllBooks(books);
            setStartIndex(0);
            setBooksIndex(0);
            setCurrentPage(1);
            setEmpty(false);
        }
    }, [emptyBooks,empty,books]);

    const handleNextPage = () => {
        // console.log("allBooks", allBooks);
        // console.log("booksIndex", booksIndex);

        if (allBooks.length - booksIndex <= 24) {
            // console.log("get new books");
            getNextPageByURL(url, startIndex + 40).then((books) => {
                console.log("books", books);
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

    return (
        <main className="home">
            <h1>Welcome to the Online Book Store</h1>
            <ul>
                {allBooks
                    .slice(booksIndex, booksIndex + 12)
                    .map((book, index) => (
                        <Book key={index} book={book} />
                    ))}
            </ul>
            <div>
                {currentPage != 1 ? (
                    <>
                        <button onClick={handlePrevPage}>Previous Page</button>
                        {currentPage}
                    </>
                ) : (
                    <></>
                )}
                <button onClick={handleNextPage}>Next Page</button>
            </div>
        </main>
    );
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
        url: state.googleBookURL,
        emptyBooks: state.emptyBooks,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
