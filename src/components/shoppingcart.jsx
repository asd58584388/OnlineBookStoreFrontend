import React, { Component } from "react";
import { connect } from "react-redux";
import { NAVIGATE_TO_CHECKOUT_PAGE } from "./redux/actionTypes";
import { getOrderSummary } from "./apiService";
import { removeBookFromCart } from "./apiService";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
        };
    }

    removerFromCart = (e) => {
        e.preventDefault();
        if(e.target.dataset?.type !== "button") return;
        let body = {
            bookId: e.target.parentNode.dataset.id
  
        };
        let headers={
            Authorization:this.props.token
        }
        removeBookFromCart(body,headers).then((result) => {
            this.setState((prevState) => {
                return {
                    cart: prevState.cart.filter(
                        (item) => {
                            if(item.bookid === e.target.parentNode.dataset.id)
                            {
                                item.quantity--;
                            }
                            return item.quantity > 0;

                        }
                    ),
                };
            });
        });
    };

    handleCheckout = (e) => {
        // getOrderSummary(this.props.token).then((result) => {
            console.log(this.state.cart);
            this.props.navigateToCheckOut(this.state.cart);
        // });
    };

    render() {
        const cart = this.state.cart;
        return (
            <div className="shopping-cart">
                <h1>Shopping Cart</h1>
                {cart.length == 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="cart-list" onClick={this.removerFromCart}>
                            {cart.map((item, index) => (
                                <li className="cart-item" key={item.bookid} data-id={item.bookid}>
                                    <p className="item-book-title">{item.booktitle}</p>
                                    <p className="item-quantity">{item.quantity}</p>
                                    <button data-type="button">Remove</button>
                                </li>
                            ))}
                        </ul>

                        <p className="total-cost">
                            <b>Total Cost: </b>
                            {cart.reduce((total, item) => {
                                return total + (item.price*item.quantity);
                            }, 0).toFixed(2)}
                        </p>
                        <button className="checkout-button" onClick={this.handleCheckout}>Checkout</button>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //   fetchBook: (bookId) => dispatch(fetchBook(bookId)),
        navigateToCheckOut: (books) =>
            dispatch({ type: NAVIGATE_TO_CHECKOUT_PAGE, payload: books }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
