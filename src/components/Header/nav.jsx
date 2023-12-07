import React, { Component } from "react";
import { connect } from "react-redux";
import * as CONSTANTS from "../redux/actionTypes";
import { searchBooks } from "../googlebookapi";
import {
    getPublicBookLists,
    getShoppingCartUser,
    getUserBookLists,
} from "../apiService";
import Filter from "./filter";
import Category from "./category";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            filter: {
                yearsFrom: "",
                yearsEnd: "",
                filterQuery: "",
                langRestrict: ""
            },
            isFilterDropdownVisible: false,
            isCategoryDropdownVisible: false,
        };


        // TODO: Bind event handlers here
        this.setParentState = this.setParentState.bind(this);
    }

    handleFilterButtonClick = () => {
        this.setState((prevState) => ({
            isFilterDropdownVisible: !prevState.isFilterDropdownVisible,
        }));
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleCategoryButtonClick = () => {
        this.setState((prevState) => ({
            isCategoryDropdownVisible: !prevState.isCategoryDropdownVisible,
        }));
    }

    setParentState = (
        yearsFrom = null,
        yearsEnd = null,
        filterQuery = null,
        langRestrict = null
    ) => {
        this.setState((prevState) => {
            return {
                filter: {
                    yearsFrom:
                        yearsFrom == null
                            ? prevState.filter.yearsFrom
                            : yearsFrom,
                    yearsEnd:
                        yearsEnd == null ? prevState.filter.yearsEnd : yearsEnd,
                    filterQuery:
                        filterQuery == null
                            ? prevState.filter.filterQuery
                            : filterQuery,
                    langRestrict:
                        langRestrict == null
                            ? prevState.filter.langRestrict
                            : langRestrict,
                },
            };
        });
    };

    handleSearchSubmit = async (event) => {
        event.preventDefault();

        const searchQuery = this.state.searchQuery;
        const filter = this.state.filter;

        searchBooks(searchQuery, filter).then((result) => {
            if(result.data.totalItems === 0)
            {
                alert("No books found");
                return;
            }
            this.props.search(result);
        });
    };

    handleClick = (event) => {
        event.preventDefault();

        if (event.target.dataset.id === "home") {
            this.props.navigateToHome();
        } else if (event.target.dataset.id === "booklist") {
            getPublicBookLists(this.props.token).then((bookLists) => {
                this.props.navigateToBooklist(bookLists);
            });
        } else if (event.target.dataset.id === "user") {
            getUserBookLists(this.props.token).then((bookLists) => {
                let payload={
                    bookLists:bookLists,
                    token:this.props.token
                }
                this.props.navigateToUser(payload);
            });
        } else if (event.target.dataset.id === "cart") {
            getShoppingCartUser(this.props.token).then((result) => {
                // console.log('result',result);
                if (result) {
                    //check result
                    this.props.navigateToCart(result.cart);
                }
            });
        } else if (event.target.dataset.id === "login") {
            this.props.navigateToLogin();
        } else if (event.target.dataset.id === "signup") {
            this.props.navigateToSignUp();
        } else if (event.target.dataset.id === "logout") {
            this.props.logout();
        }
    };

    render() {
        // console.log(this.props);
        return (
            <header>
                <nav className="nav">
                    <ul onClick={this.handleClick} className="navbar-item-left">
                        <li>
                            <a
                                className={
                                    this.props.activeLink === "home"
                                        ? "active"
                                        : ""
                                }
                                data-id="home"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className={
                                    this.props.activeLink === "booklist"
                                        ? "active"
                                        : ""
                                }
                                data-id="booklist"
                            >
                                Booklist
                            </a>
                        </li>
                        <li>
                            <div className="category-dropdown"
                                data-id="category"
                            >
                                <button className="category-button" onClick={this.handleCategoryButtonClick}>
                                    Category
                                </button>
                                {this.state.isCategoryDropdownVisible && (
                                    <div className="category-content">
                                        <Category/>
                                    </div>
                                )}
                            </div>
                        </li>
                        
                    </ul>
                    <ul onClick={this.handleClick} className="navbar-item-right">
                        {this.props.isLoggedIn ? (
                            <>
                                <li>
                                    <a
                                        className={
                                            this.props.activeLink === "user"
                                                ? "active"
                                                : ""
                                        }
                                        data-id="user"
                                    >
                                        {this.props.username}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={
                                            this.props.activeLink === "cart"
                                                ? "active"
                                                : ""
                                        }
                                        data-id="cart"
                                    >
                                        Cart
                                    </a>
                                </li>
                                <li>
                                    <a data-id="logout">Logout</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a
                                        className={
                                            this.props.activeLink === "signup"
                                                ? "active"
                                                : ""
                                        }
                                        data-id="signup"
                                    >
                                        Sign Up
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={this.handleClick}
                                        data-id="login"
                                    >
                                        Login
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="navbar-item-right">
                        <div className="filter-dropdown">
                            <button
                                className="filter-button"
                                onClick={this.handleFilterButtonClick}
                            >
                                Filter
                            </button>
                            {this.state.isFilterDropdownVisible && (   
                                    <div className="filter-content">
                                    <Filter setParentState={this.setParentState} />
                                </div>
                            )}
                        </div>
                        <form onSubmit={this.handleSearchSubmit} className="search-form">
                            <input
                                type="text"
                                value={this.state.searchQuery}
                                onChange={this.handleSearchChange}
                                placeholder="Search"
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeLink: state.activeLink,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        username: state.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigateToLogin: () =>
            dispatch({ type: CONSTANTS.NAVIGATE_TO_LOGIN_PAGE }),
        navigateToHome: () =>
            dispatch({ type: CONSTANTS.NAVIGATE_TO_HOME_PAGE }),
        navigateToBooklist: (bookLists) =>
            dispatch({
                type: CONSTANTS.NAVIGATE_TO_BOOKLIST_PAGE,
                payload: bookLists,
            }),
        navigateToUser: (bookLists) =>
            dispatch({ type: CONSTANTS.NAVIGATE_TO_USER_PAGE ,payload: bookLists}),
        navigateToSignUp: () =>
            dispatch({ type: CONSTANTS.NAVIGATE_TO_SIGNUP_PAGE }),
        navigateToCart: (cartItems) =>
            dispatch({
                type: CONSTANTS.NAVIGATE_TO_CART_PAGE,
                payload: cartItems,
            }),
        logout() {
            dispatch({ type: CONSTANTS.LOGOUT });
        },
        search: (searchResult) =>
            dispatch({ type: CONSTANTS.SEARCH, payload: {...searchResult,emptyBooks:true} }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
