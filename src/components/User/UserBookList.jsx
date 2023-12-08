import React from "react";
import * as backendAPI from "../apiService";
import { useState } from "react";
import {connect} from 'react-redux';
import { UPDATE_BOOKLISTS,NAVIGATE_TO_SINGLE_BOOKLIST_PAGE } from "../redux/actionTypes";

const UserBookList = ({ booklists, token ,navigateToBookList,updateBookLists}) => {
    const [isCreate, setIsCreate] = useState(false);
    const [bookListName, setBookListName] = useState("");
    const [bookLists, setBookLists] = useState(booklists);
    const [isPublic, setIsPublic] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setBookListName(e.target.value);
    };

    const handleCheckbox = (e) => {
        setIsPublic(e.target.checked);
    };

    const toggleCreateBookList = () => {
        setIsCreate(!isCreate);
    };

    const getBookList = (e) => {
        // getBookList(e.target.dataset.id,token).then((result) => {
        //     console.log(result);
        // });
        
        e.preventDefault();
        
        let targetElement=e.target;

        while(targetElement.dataset.type==undefined){
            targetElement=targetElement.parentElement;
        }

        let booklist=bookLists.find((booklist)=>booklist.id==targetElement.dataset.id);
        console.log(booklist);
        navigateToBookList(booklist);

    };

    const createBookList = () => {
        if (bookListName != "") {
            let json = {
                bookListName: bookListName,
                isPublic: isPublic,
            };
            backendAPI.createBookList(json, token).then((result) => {
                console.log(result);
                setBookLists([...bookLists, result]);
                updateBookLists([...booklists, result]);
 
            });
        } else {
            alert("Booklist name cannot be empty");
        }
    };

    if (bookLists == null || bookLists.length == 0) {
        return (
            <div className="user-booklists-container">
                <div className="no-booklists-message">You have no Booklists</div>
                {isCreate ? (
                    <>
                        <input
                            type="text"
                            placeholder="New BookList"
                            className="create-booklist-input"
                            onChange={handleChange}
                        />
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                name="public"
                                checked={isPublic}
                                onChange={handleCheckbox}
                                value={false}
                            />
                            <label htmlFor="public">
                                Public
                            </label>
                        </div>
                        <button className="create-booklist-button" onClick={createBookList}>Create</button>
                    </>
                ) : (
                    <>
                        <button className="create-booklist-button" onClick={toggleCreateBookList}>
                            Create a Booklist
                        </button>
                    </>
                )}
            </div>
        );
    } else {
        return (
            <div className="user-booklists-container">
                <ul className="user-booklists-list" onClick={getBookList}>
                    {bookLists.map((booklist) => {
                        return (
                            <li key={booklist.id} className="booklist-item" data-id={booklist.id} data-type='booklist'>
                                <h4 className="booklist-name">{booklist.bookListName}</h4>
                                <ul className="book-item">
                                    {booklist.books.map((book) => {
                                        return (
                                            <li key={book.bookid} data-id={book.id}>
                                                <h5>{book.title}</h5>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
                {isCreate ? (
                    <>
                        <input
                            type="text"
                            placeholder="New BookList"
                            className="create-booklist-input"
                            onChange={handleChange}
                        />
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                name="public"
                                checked={isPublic}
                                onChange={handleCheckbox}
                                value={false}
                            />
                            <label htmlFor="public">
                                Public
                            </label>
                        </div>
                        <button className="create-booklist-button" onClick={createBookList}>Create</button>
                    </>
                ) : (
                    <>
                        <button className="create-booklist-button" onClick={toggleCreateBookList}>
                            Create a Booklist
                        </button>
                    </>
                )}
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigateToBookList: (booklist) => dispatch({
            type: NAVIGATE_TO_SINGLE_BOOKLIST_PAGE,
            payload: booklist,
        }),
        updateBookLists: (booklists) => dispatch({
            type: UPDATE_BOOKLISTS,
            payload: booklists,
        }),
    };
}

export default connect(null,mapDispatchToProps)(UserBookList);
