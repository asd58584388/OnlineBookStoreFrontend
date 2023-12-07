import React from 'react';
import { connect } from 'react-redux';
import { NAVIGATE_TO_SINGLE_BOOKLIST_PAGE } from '../redux/actionTypes';

const BookLists = ({ bookLists,navigateToBookList}) => {

    const handleClick = (e) => {
        e.preventDefault();
        let targetElement=e.target;

        while(targetElement.dataset.type==undefined){
            targetElement=targetElement.parentElement;
        }

        let booklist=bookLists.find((booklist)=>booklist.id==targetElement.dataset.id);
        // console.log(booklist);
        navigateToBookList(booklist);

    };


    if(bookLists == undefined||bookLists.length == 0){
        return <div className="no-booklists-message">No Booklist</div>
    }
    else{
        return (
            <div className="booklists-container">
                <ul className="booklists-list" onClick={handleClick}>
                    {bookLists.map((booklist, index) => (
                        <li key={index} data-id={booklist.id} data-type='booklist'>
                            <h3 className="booklist-name">{booklist.bookListName}</h3>
                            <p>By {booklist.createUserName}</p>
                            <p>Create At: {booklist.createDate}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        bookLists: state.bookLists,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        navigateToBookList: (booklist) => dispatch({
            type: NAVIGATE_TO_SINGLE_BOOKLIST_PAGE,
            payload: booklist,
        }),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BookLists);
