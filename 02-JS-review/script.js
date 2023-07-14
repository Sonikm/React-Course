const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: false,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// || -------------------DESTRUCTURING--------------------------
const book = getBook(1);
// const author = book.author;
// const title = book.title;

const { title, author, pages, publicationDate, genres } = book;

console.log(author, title, pages, publicationDate, genres);
console.log(...genres);
const [primaryGenres, seconderyGenres, ...otherGenres] = genres;
console.log(primaryGenres, seconderyGenres, otherGenres);
console.log(...otherGenres, "Poohs");

const newGenre = [...otherGenres, "Nikita"];
console.log(newGenre);

const updatedBook = {
  ...book, // spreading book
  pages: 2000, // overwriting a pages number
  moviePublicationDate: "20-04-2005", // adding a new properties
};
console.log(...[updatedBook]);
updatedBook;
console.log(updatedBook.pages);

// Original object is not modified
console.log(book.pages);

// ||------------------ TEMPLATE LITRAIL----------------------------
const summary = `${title}, a ${pages}-page long book, was written by ${author} and published in ${publicationDate}`;
console.log(summary);

// ||-------------TERNARIES INSTEAD OF IF/ELSE STATEMENT----------------------
const pageResult = pages > 1000 ? "Over a thousand" : "Less than thousand";
pageResult;

console.log(20 > 15 ? true : false);
console.log(20 < 15 ? true : false);

// || ------------------ARRAOW FUNCTION-------------------------------
console.log(publicationDate);
function getYear(year) {
  return year.split("-")[0];
}
// console.log(publicationDate.split('-')[0]);
console.log(getYear(publicationDate));

const getYear2 = (str) => str.split("-")[0];
console.log(getYear2(publicationDate));

// || -------------SHORT-CIRCUITING AND LOGICAL OPERATORS: &&, ||, ??---------------

console.log(true && "Second Value");
console.log(false && "Second value");
console.log(book.hasMovieAdaptation && "This book has a movie");

// falsy value: 0, null, undefined
console.log(0 && "soni");
console.log(null && "soni");
console.log(undefined && "soni");

// Truthy value: name
console.log("soni");

console.log(true || false);
console.log(false || "Some string");

console.log(book.translations.spanish || "NOT TRANSLATED");

console.log(book.reviews.goodreads.reviewsCount || "value is not found");

const count = book.reviews.librarything.reviewsCount ?? "no data";

// will return 0
count;

// ||------------------- OPTIONAL CHAINING-----------------
function getTotalReviewCount(book2) {
  const goodreads = book2.reviews?.goodreads?.reviewsCount;
  const librarything = book2.reviews.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}

const book2 = getBook(3);
console.log(getTotalReviewCount(book2));

// ||---------------MAP METHOD--------------------------------
const books = getBooks();
books;

const x = [1, 2, 3, 4, 5].map((el) => el * 2);
console.log(x);

const titles = books.map((book) => book.title);
titles;

const essentialData = books.map((book) => {
  return {
    title: book.title,
    author: book.author,
    review: book.reviews,
  };
});

console.log(essentialData);

// ||-------------------FILTER METHOD---------------------------------
const longBookWithMovie = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
console.log(longBookWithMovie);

const spanishBooks = books.filter((book) => book.translations.spanish);
console.log(spanishBooks);
spanishBooks.forEach((e) => console.log(e.translations.spanish));

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => [book.id, book.title, book.author]);

console.log(...adventureBooks);

// ||---------------------------REDUCE MATHOB------------------------------------------------------------
const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0);
console.log(pagesAllBooks);

// ||--------------------------SORT METHOD--------------------------------
const numArr = [3, 4, 6, 7, 4, 1, 5, 8];

const reversed = numArr.reverse();
console.log(reversed);

// const sorted = numArr.sort((a, b) => a - b);
// const sorted = numArr.sort();
const sorted = numArr.slice().sort();
console.log(sorted);
console.log(numArr);

const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
console.log(sortedByPages);

// ||-----------------------IMMUTABLE ARRAYS-------------------------

// 1) Add book object to array
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Sectrets",
  author: "J. K. Rowling",
};

const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

// 2) Delete book object from array
const bookAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
console.log(bookAfterDelete);

// 3) Update book object in the arry
const bookAfterUpdate = bookAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 1, author: "Soni K." } : book
);
console.log(bookAfterUpdate);

// ||---------------ASYNCHRONOUS JS: PROMISES----------------------------
// console.log("Wait till the data fetch");

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// console.log("Wait till the data fetch");

// ||------------------ASYNC/AWAIT-----------------------------------
console.log("Before fetching..........");

async function getData() {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  const res = await data.json();

  // console.log(res);
  return res;
}

const fetchData = getData();
console.log(fetchData);
console.log("After fetching.................");
