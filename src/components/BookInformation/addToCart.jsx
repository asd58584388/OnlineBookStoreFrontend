import React, { useEffect } from "react";
import { useState } from "react";
import * as backendAPI from "../apiService";

const AddToCart = ({isForSale,book,token}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [numberOfAddedBooks, setNumberOfAddedBooks] = useState(0);


    //TODO: get the number of books in the cart
    useEffect(() => {
    },[]);

    const addToCart = (e) => {

        let BookInformation={
            id:book.id,
            title:book.volumeInfo.title,
            authors:book.volumeInfo.authors,
            thumbnail:book.volumeInfo.imageLinks.thumbnail,
            smallThumbnail:book.volumeInfo.imageLinks.smallThumbnail,
            price:book.saleInfo.retailPrice.amount
        }
        let content ={
            token:token,
            book:BookInformation
        }

        
        backendAPI.addBookToCart(content).then((result) => {
            if (result) {
                setIsAdded(true);
                setNumberOfAddedBooks(numberOfAddedBooks+1);
            }
        });
    };

    if(isForSale){
        return (
            <button className="addToCartButton" onClick={addToCart} >
                {isAdded ? `Added ${numberOfAddedBooks} to Cart` : "Add to Cart"}
            </button>
        );
    }
    else
    {
        return (
            <button className="notSaleButton" disabled={true}>
                Not For Sale
            </button>
        );
    }
};

export default AddToCart;
