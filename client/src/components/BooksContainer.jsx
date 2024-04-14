import { useAllBooksContext } from "../pages/AllBooks";

import Book from "./Book";

const BooksContainer = () => {
  const { data } = useAllBooksContext();
  const { books } = data;
  if (books.length === 0) {
    return <div>No books</div>;
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => {
        return <Book key={book._id} {...book} />;
      })}
    </div>
  );
};

export default BooksContainer;
