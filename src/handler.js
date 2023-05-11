const { nanoid } = require("nanoid");
const bookshelfs = require("./bookshelfs");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload,
    id = nanoid(16),
    finished = pageCount === readPage,
    insertedAt = new Date().toISOString(),
    updatedAt = insertedAt;

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookshelfs.push(newBook);

  const isSuccess = bookshelfs.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = bookshelfs.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookshelfs.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const index = bookshelfs.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookshelfs[index] = {
      ...bookshelfs[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

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
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
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

module.exports = { addBookHandler, deleteBookByIdHandler, editBookByIdHandler, getAllBooksHandler, getBookByIdHandler };
