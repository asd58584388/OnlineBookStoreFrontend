import React, { Component } from "react";
import { connect } from "react-redux";
import { SIGNUP } from "./redux/actionTypes";
import { debounce } from "lodash";
import * as backendAPI from "./apiService";
import * as Constants from "./redux/actionTypes";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            email: "",
        };

        // this.checkAvailabilityDelayed = debounce(this.checkAvailabilityDelayed, 2000);
    }

    handleChange = async (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // if(e.target.name === 'username')
        // {
        //   let userInformation={ userName:e.target.value};
        //   let result = await this.checkAvailabilityDelayed(userInformation);
        //   result.then((result) => {
        //     if(result){

        //     }
        //   });
        // }
    };

    // checkAvailabilityDelayed = async (userInformation) => {
    //   let availability = false;
    //   if(userName!=null){
    //     const response = await fetch(`/user/${userName}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify( userInformation),
    //     });
    //     const data = await response.json();
    //     data.then((data) => {
    //       if(data!=null)
    //       {
    //         availability = true;
    //       }
    //     });
    //   }
    //   return availability;

    // };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password, confirmPassword, email } = this.state;
        // Dispatch the registerUser action with the user data
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            let userInformation = {
                username: username,
                password: password,
                email: email,
            };

            backendAPI.registerUser(userInformation).then((data) => {
                // TODO: check token
                if (data.token === undefined) {
                    alert("Email is used, Registration failed");
                    return;
                } else {
                    let message = {
                        username: username,
                        token: data.token,
                        message: {
                            type: Constants.SIGNUP_SUCCESS,
                            message: "Registration successful",
                        },
                    };
                    this.props.registerUser(message);
                }
            });
        }
    };

    render() {
        const { username, password, confirmPassword, email } = this.state;
        return (
            <div className="signup-container">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (message) => dispatch({ type: SIGNUP, payload: message }),
    // navigateToSuccess: (message) => dispatch({type: Constants.NAVIGATE_TO_SUCCESS_PAGE,payload: message}),
});

export default connect(null, mapDispatchToProps)(Signup);
