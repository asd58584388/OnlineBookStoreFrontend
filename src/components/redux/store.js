import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as CONSTANTS from "./actionTypes";

// Define initial state
const initialState = {
    activeLink: "home",
    isLoggedIn: false,
    username: "",
    cart: [],
    googleBookData: [],
    token: "",
    book: {},
    orderSummary: {}, //may need to change
    token: "",
    successType: "",
    userid: "",
    emptyBooks: false,
};

// Define reducer function
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.LOGIN:
            return {
                ...state,
                activeLink: "home", // TODO: may need to change
                isLoggedIn: true,
                username: action.payload.username,
                userid: action.payload.userid,
                token: action.payload.token,
                cart: action.payload.cart,
                userBookLists: action.payload.bookLists,
            };
        case CONSTANTS.LOGOUT:
            return {
                ...state,
                activeLink: "home",
                isLoggedIn: false,
                username: "",
                cart: [],
                userid: "",
                token: "",
                userBookLists: [],
            };
        // case CONSTANTS.RETURN:
        //   return {
        //     ...state,
        //     activeLink: action.payload.prevPage
        //   };
        case CONSTANTS.SEARCH:
            return {
                ...state,
                activeLink: "searchresult",
                googleBookData: action.payload.data,
                googleBookURL: action.payload.url,
                emptyBooks: action.payload.emptyBooks,
            };
        case CONSTANTS.SIGNUP:
            return {
                ...state,
                activeLink: "success",
                isLoggedIn: true,
                username: action.payload.username,
                token: action.payload.token,
                successType: action.payload.message.type,
                successMessage: action.payload.message.message,
            };
        case CONSTANTS.UPDATE_BOOKLISTS:
            return {
                ...state,
                userBookLists: action.payload,
            };
        case CONSTANTS.NAVIGATE_TO_USER_PAGE:
            if (typeof action.payload === "string") {
                return {
                    ...state,
                    activeLink: "user",
                    userBookLists: state.userBookLists.filter(
                        (booklist) => booklist.id != action.payload
                    ),
                };
            }
            return {
                ...state,
                activeLink: "user",
                userBookLists: action.payload.bookLists,
                token: action.payload.token,
                // username: action.payload.username,
                // userid: action.payload.userid,
                // cart: action.payload.cart
            };
        case CONSTANTS.INIT_BOOKS:
            return {
                ...state,
                googleBookData: action.payload,
            };
        case CONSTANTS.NAVIGATE_TO_BOOKLIST_PAGE:
            return {
                ...state,
                activeLink: "booklist",
                bookLists: action.payload,
            };
        case CONSTANTS.NAVIGATE_TO_SINGLE_BOOKLIST_PAGE:
            return {
                ...state,
                activeLink: "singlebooklist",
                singleBookList: action.payload,
            };
        case CONSTANTS.NAVIGATE_TO_HOME_PAGE:
            return {
                ...state,
                activeLink: "home",
                googleBookData: [],
            };
        case CONSTANTS.NAVIGATE_TO_LOGIN_PAGE:
            return {
                ...state,
                activeLink: "login",
            };
        case CONSTANTS.NAVIGATE_TO_SIGNUP_PAGE:
            return {
                ...state,
                activeLink: "signup",
            };
        case CONSTANTS.NAVIGATE_TO_CART_PAGE:
            return {
                ...state,
                activeLink: "cart",
                cart: action.payload,
            };
        case CONSTANTS.NAVIGATE_TO_CHECKOUT_PAGE:
            return {
                ...state,
                activeLink: "checkout",
                orderSummary: action.payload,
            };
        case CONSTANTS.NAVIGATE_TO_BOOKINFORMATION_PAGE:
          console.log(action.payload);
            // if(action.payload.length==0)
            // {
            //   return {
            //     ...state
            //   };
            // }
            return {
                ...state,
                activeLink: "bookinformation",
                book: action.payload.book,
                bookReviews: action.payload.bookReviews,
            };
        case CONSTANTS.NAVIGATE_TO_SUCCESS_PAGE:
            return {
                ...state,
                activeLink: "success",
                successMessage: action.payload,
            };
        default:
            return state;
    }
};

// Create Redux store
const store = createStore(loginReducer, applyMiddleware(thunk));

export default store;
