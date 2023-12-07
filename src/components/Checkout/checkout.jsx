import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as backendAPI from '../apiService';
import * as Constants from '../redux/actionTypes';
import OrderSummary from './orderSummary';


const Checkout = ({ orderSummary, token, navigateToSuccess }) => {
  const [books, setBooks] = useState(orderSummary);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvv, setCvv] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCreditCardNumberChange = (e) => {
    setCreditCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('Checkout submitted:', { books, firstName, lastName, email, address, creditCardNumber, cvv });
    let obj = {
      books: books,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      // creditCardNumber: creditCardNumber,
      // cvv: cvv,
    };

    backendAPI.checkout(obj, token).then((result) => {
        let message = {
          type: Constants.CHECKOUT_SUCCESS,
          message: 'Your order has been placed successfully!',
        };
        navigateToSuccess(message);
      
    }).catch((err) => {
      console.log(err);
      alert('Something went wrong. Please try again later.');
    });
  };

  return (
    <div className="order-form-container">
      <h2>Checkout</h2>

      <OrderSummary orderSummary={orderSummary} />

      <form onSubmit={handleSubmit} className='order-form'>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} required />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} required/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} required/>

        <label htmlFor="address">Address:</label>
        {/* <textarea id="address" value={address} onChange={handleAddressChange} /> */}
        <input type="address" id="address" value={address} onChange={handleAddressChange} required/>


        <label htmlFor="creditCardNumber">Credit Card Number:</label>
        <input
          type="text"
          id="creditCardNumber"
          value={creditCardNumber}
          onChange={handleCreditCardNumberChange}
          required/>

        <label htmlFor="cvv">CVV:</label>
        <input type="password" id="cvv" value={cvv} onChange={handleCvvChange} required/>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    orderSummary: state.orderSummary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToSuccess: (message) =>
      dispatch({ type: Constants.NAVIGATE_TO_SUCCESS_PAGE, payload: message }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
