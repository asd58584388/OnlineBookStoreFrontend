import axios from "axios";

// const baseURL = "http://localhost:3006/api";
// const baseURL = "https://bookstore-backend-xhok.onrender.com/api";
const baseURL = "https://onlinebookstore-backend.onrender.com/api";


export async function addBookToCart(book) {
    return axios
        .post(baseURL + "/cart/", book)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getBookReviews(obj) {
    let book = {
        bookId: obj,
    };
    return axios
        .post(baseURL + "/bookReviews/", book)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getUserBookLists(token) {
    return axios
        .get(baseURL + "/users/bookLists", {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function createBookList(obj, token) {
    return axios
        .post(baseURL + "/users/bookLists", obj, {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function checkUserBookList(obj, token) {
    return axios
        .get(baseURL + "/bookLists/check/" + obj, {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function addToBookList(obj, token) {
    console.log(baseURL + "/users/bookLists/" + obj.bookListId, obj);
    return axios
        .post(baseURL + "/users/bookLists/" + obj.bookListId, obj, {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function removeBookFromList(json, token) {
    return axios
        .delete(baseURL + "/users/bookLists/" + json.booklistid, {
            headers: { Authorization: token },
            data: json,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getPublicBookLists(token) {
    return axios
        .get(baseURL + "/bookLists/", { headers: { Authorization: token } })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getBookList(bookListID, token) {
    return axios
        .get(baseURL + "/bookLists/" + bookListID, {
            headers: { Authorization: token },
        })
        .then((res) => {})
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function addBookReview(obj, token) {
    return axios
        .post(baseURL + "/bookReviews/add", obj, {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function registerUser(user) {
    return axios
        .post(baseURL + "/users/", user)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function loginUser(user) {
    console.log(baseURL + "/users/login");
    return axios
        .post(baseURL + "/users/login", user)
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function logoutUser() {
    //TODO: add token to header
    // let config = {
    //     headers:{
    //         Authorization: "Bearer " + localStorage.getItem("token")
    //     }
    // };

    return axios
        .post("/api/users/logout")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getShoppingCartUser(token) {
    return axios
        .get(baseURL + "/cart/", { headers: { Authorization: token } })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getOrderSummary(token) {
    return axios
        .get(baseURL + "/users/order", token)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function removeBookFromCart(body, headers) {
    return axios
        .delete(baseURL + "/cart/", { headers, data: body })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function removeWholeBooklist(id, token) {
    let headers = {
        Authorization: token,
    };
    return axios
        .delete(baseURL + "/bookLists/" + id, { headers })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
        });
}

export async function checkout(obj, token) {
    return axios
        .post(baseURL + "/cart/checkout", obj, {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function getBookCategory() {
    return axios
        .get(baseURL + "/categories")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
            throw err;
        });
}

export async function addBookListReview(obj, token) {
    return axios
        .post(baseURL + "/bookLists/review", obj, {
            headers: { Authorization: token },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log("Error: " + err);
        });
}
