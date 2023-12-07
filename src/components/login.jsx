import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './apiService';
import * as CONSTANTS from './redux/actionTypes';

const Login = ({ loginUserAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({ email: email, password }).then((result) => {
      console.log("result", result);
      if(result.message === "Successful Login")
      {
        loginUserAction({
          userid: result.user.id,
          username: result.user.username,
          cart: result.user.cart,
          token: result.token,
          bookLists: result.user.bookLists,
        })
      
      }
    }).catch((err) => {
      alert("Invalid Email or Password");
      console.log(err.message);
    });
    
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleUsernameChange}
          />
        
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     userName: state.userName,
    
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserAction: (user) => dispatch({type: CONSTANTS.LOGIN, payload: user})
  };
}


export default connect(null,mapDispatchToProps)(Login);

