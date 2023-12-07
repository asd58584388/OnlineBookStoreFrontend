import * as Constants from './components/redux/actionTypes'
import Nav from './components/Header/nav'
import './App.css'
import Footer from './components/Footer/footer'
import Home from './components/Home/home'
import { Component } from 'react'
import { connect } from 'react-redux'
import Signup from './components/signup'
import Login from './components/login'
import BookInformation from './components/BookInformation/bookInformation'
import Success from './components/success'
import ShoppingCart from './components/shoppingcart'
import BookList from './components/BookList/bookList'
import User from './components/User/user'
import SingleBookList from './components/BookList/singleBookList'
import Checkout from './components/Checkout/checkout'
import SearchResult from './components/Home/searchResult'





class App extends Component {
  constructor(props) {
    super(props);

    // getNewBooks().then((books) => {
    //   console.log(books.items);
    //   this.props.initBooks(books.items);
    // });
    
    this.activePage=this.activePage.bind(this); // TODO: Bind event handlers here
  }
  
  // componentDidMount() {
  //   this.setState({ books: getNewBooks() });

  // }

  activePage = () => {
    switch(this.props.activeLink) {
      case 'home':
        return <Home />;
      case 'books':
        return <Books />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'bookinformation':
        return <BookInformation />;
      case 'success':
        return <Success />;
        case 'cart':
          return <ShoppingCart />;
      case 'booklist':
        return <BookList />;
      case 'user':
        return <User booklists={this.props.userBookLists} token={this.props.token}/>;
      case 'singlebooklist':
        return <SingleBookList bookList={this.props.singleBookList} token={this.props.token}/>;
        case 'checkout' :
          return <Checkout />;
          case 'searchresult':
            return <SearchResult />;
      default:
        return <Home />;
    }
  }

  render() {
    return (
      <>
        <Nav/>
        {
          this.activePage()
        }
        <Footer />
      </>
    );
  }
}



const mapStatetoProps = (state) => ({
  activeLink: state.activeLink,
  token: state.token,
  userBookLists: state.userBookLists,
  singleBookList: state.singleBookList
});

const mapDispatchtoProps = (dispatch) => ({
  handleLogin: () => dispatch({ type: Constants.NAVIGATE_TO_LOGIN_PAGE })
});

export default connect(mapStatetoProps,mapDispatchtoProps)(App);
