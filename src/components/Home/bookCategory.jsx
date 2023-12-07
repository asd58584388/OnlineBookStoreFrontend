import { UPDATE_BOOKS_BY_CATEGORY } from '../redux/actionTypes';
import React from 'react';
import { getBookCategory } from '../apiService';
import { set } from 'lodash';

const BookCategory = () => {

    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getBookCategory().then((data) => {
            setCategories(data);
            setIsLoading(false);
        }); 
    }, []);

    if(!isLoading){
        return (
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <a href={`/category/${category.id}`}>{category.name}</a>
                    </li>
                ))}
            </ul>
        );
    }
};

// const mapStateToProps = (state) => {
//     return {
//         categories: state.categories,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateBooksByCategory:(books) => dispatch({type:UPDATE_BOOKS_BY_CATEGORY,payload:books}),
//     }
// };

export default BookCategory;
