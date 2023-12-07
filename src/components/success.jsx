import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as CONSTANTS from './redux/actionTypes';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirectToHome: true });
    }, 2000);
  }

  render() {
    if (this.state.redirectToHome) {
      this.props.navigateToHome();
      // return <Redirect to="/home" />;
    }

    // switch (this.props.message.type) {
    //   case CONSTANTS.CHECKOUT_SUCCESS:
    //     return 
    //     (
    //   <div>
    //     <h1>Successful!</h1>
    //     <p>{this.props.message}</p>
    //   </div>
    //     )
    //     case CONSTANTS.SIGNUP_SUCCESS:
    //     return 
    //     (
    //   <div>
    //     <h1>Successful!</h1>
    //     <p>You have successfully signed up.</p>
    //     <p>{this.props.message}</p>
    //   </div>
    //     )
    
    return (
      <div>
        <h1>Successful!</h1>
        <p>{this.props.message.message}</p>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    message: state.successMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToHome: () => dispatch({ type: CONSTANTS.NAVIGATE_TO_HOME_PAGE })
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Success);
