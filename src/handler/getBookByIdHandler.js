const bookshelfs = require("../bookshelfs");

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = bookshelfs.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { getBookByIdHandler };
