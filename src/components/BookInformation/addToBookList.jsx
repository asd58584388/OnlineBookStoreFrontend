import React, { useState } from "react";
import * as backendAPI from "../apiService";

const AddToBookList = ({ book, token, userBookLists }) => {
    const [toggleAddToBooklist, setToggleAddToBooklist] = useState(false);
    const [selectedBookList, setSelectedBookList] = useState("");

    const addToBookList = (e) => {

        console.log(book);
        let content = {
            bookListId: selectedBookList,
            book: {
                bookid: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
            },
        };
        backendAPI.addToBookList(content, token).then((result) => {
            console.log(result);
            if (result) {
                // Add logic here for successful addition to booklist
            }
        });
    };
    const activeAddToBookList = (e) => {
        setToggleAddToBooklist(true);
    };

    const handleBookListChange = (e) => {
        setSelectedBookList(e.target.value);
    };

    if (!toggleAddToBooklist) {
        return (
            <div>
                <button className="addToBookListButton" onClick={activeAddToBookList}>Add to BookList</button>
            </div>
        );
    } else {
        return (
            <div>
                <select
                    value={selectedBookList}
                    onChange={handleBookListChange}
                    className="bookListSelect"
                >
                    <option value="">Select BookList</option>
                    {userBookLists.map((bookList) => (
                        <option value={bookList.id} key={bookList.id}>
                            {bookList.bookListName}
                        </option>
                    ))}
                </select>
                <button className="addToBookListButton" onClick={addToBookList}>Add to BookList</button>
            </div>
        );
    }
};

export default AddToBookList;
