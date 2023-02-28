const { addBookHandler } = require("./handler/addBookHandler");
const { deleteBookByIdHandler } = require("./handler/deleteBookByIdHandler");
const { editBookByIdHandler } = require("./handler/editBookByIdHandler");
const { getAllBooksHandler } = require("./handler/getAllBooksHandler");
const { getBookByIdHandler } = require("./handler/getBookByIdHandler");

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
