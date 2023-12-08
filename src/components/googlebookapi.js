// This file includes the API call to the Google Books API
import axios from "axios";

let google_api_key = "AIzaSyDBUDSycWuAiwS1FcppoermrIJJOPku2yg";

// Search for books
// used for search bar in navbar
// TODO: startIndex is not used or using nextPageToken
export async function searchBooks(query,filter=null, startIndex=0) {
  let publishedDate = '';
  let langRestrict='';
  let filterQuery = '';
  // let resultIndex="&startIndex="+startIndex;

  if(filter.yearsFrom!='' && filter.yearsEnd!=''){
    publishedDate = "+publishedDate:" + filter.yearsFrom + '-' + filter.yearsEnd;
  }
  if(filter.langRestrict!='')
  {
    langRestrict = "&langRestrict=" + filter.langRestrict;
  }
  if(filter.filterQuery!='')
  {
    filterQuery = "&filter=" + filter.filterQuery;
  }
  
  console.log('filter',filter);
  console.log('filterQuery',filterQuery);

  let url = "https://www.googleapis.com/books/v1/volumes?q=" + query +publishedDate+langRestrict+"&maxResults=40"+"&startIndex="+startIndex+filterQuery+"&key=" +google_api_key

  console.log(url);

  return axios
    .get(
      url
    )
    .then((res) => {
      if(res.data.totalItems==0)
      {
        return res.data;
      }
      else
      {

        return {
          data:getBooksWithImages(getBooksForSale(res.data.items)),
          url:url
        }
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });
}


export async function getBookById(id) {
  return axios
    .get(
      "https://www.googleapis.com/books/v1/volumes/" + id + "?key=" + google_api_key
    )
    .then((res) => {
      console.log("res",res);
      
      return res.data;
      
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });
}


// Get recent new books
// used for home page
export async function getNewBooks(startIndex=0) {
  const res = await axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=fiction&orderBy=newest&maxResults=40"+"&startIndex="+startIndex+"&printType=books&key=" +
        google_api_key
    )
    .then((res) => {
      if(res.data.totalItems==0)
      {
        return res.data;
      }
      else
      {

        return getBooksWithImages(getBooksForSale(res.data.items));
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });

  return res;
}

export async function getBooksByCategory(category) {
  
  return await axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q="+"+subject="+category+"&orderBy=newest&maxResults=40"+"&startIndex=0&key="+google_api_key)
    .then((res) => {
      if(res.data.totalItems==0)
      {
        return res.data;
      }
      else
      {

        return {
          data:getBooksWithImages(getBooksForSale(res.data.items)),
          url:"https://www.googleapis.com/books/v1/volumes?q="+"+subject:"+category+"&orderBy=newest&maxResults=40"+"&startIndex=0&key="+google_api_key
        }
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });
};

export async function getNextPageByURL(url,startIndex=0) {
  const regex = /&startIndex=\d+/;
  
  url=url.replace(regex,"&startIndex="+startIndex);
  console.log(url);
  return await axios
    .get(
      url
    )
    .then((res) => {
      console.log(res);
      if(res.data.totalItems==0)
      {
        return res.data;
      }
      else
      {
        return getBooksWithImages(getBooksForSale(res.data.items));
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });

};

export async function getNextPage(url=null,startIndex=0) {
  if(url==null)
  {
    return await axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=fiction&orderBy=newest&maxResults=40"+"&startIndex="+startIndex+"&printType=books&key=" +
          google_api_key
      )
      .then((res) => {
        if(res.data.totalItems==0)
        {
          return res.data;
        }
        else
        {
  
          return getBooksWithImages(getBooksForSale(res.data.items));
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
        throw err;
      });
    
  }
  else
  {
    return await axios
    .get(
      url
    )
    .then((res) => {
      if(res.data.totalItems==0)
      {
        return res.data;
      }
      else
      {

        return getBooksWithImages(getBooksForSale(res.data.items));
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });
  }

  
}

// Get certain type of books
// used for selecting books by subject
export async function getBooksBySubject(subject) {
  return axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=subject:" +
        subject +
        "&key=" +
        google_api_key
    )
    .then((res) => {
      if(res.data.totalItems==0)
      {
        return res.data;
      }
      else
      {

        return getBooksWithImages(getBooksForSale(res.data.items));
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      throw err;
    });
}

//just get the book that have Images
function getBooksWithImages(books) {
  // console.log('books',books);

  if(books.totalItems==0)
  {
    return books;
  }

  books = books.reduce((acc, book) => {
    if (typeof book.volumeInfo.imageLinks?.thumbnail != "undefined") {
      acc.push(book);
    }
    return acc;
  }, []);

  return books;
}


function getBooksForSale(books) {
  if(books.totalItems==0)
  {
    return books;
  }
  else{
    books = books.reduce((acc, book) => {
      if (book.saleInfo.saleability != "NOT_FOR_SALE") {
        acc.push(book);
      }
      return acc;
    }, []);
  
    return books;
  }
}
