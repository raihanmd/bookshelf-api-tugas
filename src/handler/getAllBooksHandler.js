const bookshelfs = require("../bookshelfs");

const getAllBooksHandler = (request, h) => {
  const { name, finished, reading } = request.query;

  if (bookshelfs.length === 0) {
    return h.response({
      code: 200,
      status: "success",
      data: {
        books: bookshelfs,
      },
    });
  }

  const mappedBooks = bookshelfs.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });

  if (reading === "0") {
    const getAllBooksReadings = bookshelfs
      .filter((book) => book.reading === false)
      .map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });
    return h.response({
      code: 200,
      status: "success",
      data: {
        books: getAllBooksReadings,
      },
    });
  } else if (reading === "1") {
    const getAllBooksReadings = bookshelfs
      .filter((book) => book.reading === true)
      .map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });
    return h.response({
      code: 200,
      status: "success",
      data: {
        books: getAllBooksReadings,
      },
    });
  }

  if (finished === "0") {
    const getAllBooksFinished = bookshelfs
      .filter((book) => book.finished === false)
      .map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });
    return h.response({
      code: 200,
      status: "success",
      data: {
        books: getAllBooksFinished,
      },
    });
  } else if (finished === "1") {
    const getAllBooksFinished = bookshelfs
      .filter((book) => book.finished === true)
      .map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });
    return h.response({
      code: 200,
      status: "success",
      data: {
        books: getAllBooksFinished,
      },
    });
  }

  if (name) {
    const getBooksByName = bookshelfs
      .filter((book) => {
        const nameLower = name.toLowerCase();
        const bookNameLower = book.name.toLowerCase();
        return bookNameLower == nameLower;
      })
      .map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });
    return h.response({
      code: 200,
      status: "success",
      data: {
        books: getBooksByName,
      },
    });
  }

  return h.response({
    code: 200,
    status: "success",
    data: {
      books: mappedBooks,
    },
  });
};

module.exports = { getAllBooksHandler };
