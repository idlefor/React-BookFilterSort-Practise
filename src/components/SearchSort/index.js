import React, { useState } from "react";
import Books from "../Books";

function SearchSort({ booksList }) {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(null); // null | 'asc' | 'desc'

  // Step 1: Filter on UNSORTED data based on search input
  // Search triggers only after every 2 characters (multiples of 2: 2, 4, 6...)
  // Search is case-sensitive and filters by genre containing the typed characters
  const getFilteredBooks = () => {
    let filtered = [...booksList];

    // Only filter when the search string length is a multiple of 2 (and > 0)
    if (searchText.length > 0 && searchText.length % 2 === 0) {
      filtered = filtered.filter((book) =>
        book.genre.includes(searchText)
      );
    } else if (searchText.length === 0) {
      // When search box is empty, show all books
      filtered = [...booksList];
    } else {
      // For lengths that are odd (not a multiple of 2), show prior results
      // We achieve this by returning the last valid filtered set
      // Since state isn't used for this, we compute it from the last even-length prefix
      const lastEvenLength = searchText.length - (searchText.length % 2);
      if (lastEvenLength === 0) {
        filtered = [...booksList];
      } else {
        const lastEvenText = searchText.substring(0, lastEvenLength);
        filtered = booksList.filter((book) =>
          book.genre.includes(lastEvenText)
        );
      }
    }

    return filtered;
  };

  // Step 2: Sort the filtered results
  const getSortedBooks = (filtered) => {
    if (sortOrder === "asc") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }
    return filtered;
  };

  const filteredBooks = getFilteredBooks();
  const displayedBooks = getSortedBooks(filteredBooks);

  const handleSortAsc = () => {
    setSortOrder("asc");
  };

  const handleSortDesc = () => {
    setSortOrder("desc");
  };

  return (
    <>
      <div className="w-100 layout-row justify-content-center align-items-end pa-20">
        <input
          className="large w-50"
          placeholder="Search for a book genre"
          data-testid="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
        />
        <button
          className="my-0 h-4 mr-0"
          value="Sort A to Z"
          data-testid="sort-asc"
          onClick={handleSortAsc}
        >
          Sort A to Z
        </button>
        <button
          className="my-0 h-4"
          value="Sort Z to A"
          data-testid="sort-desc"
          onClick={handleSortDesc}
        >
          Sort Z to A
        </button>
      </div>
      <Books books={displayedBooks} />
    </>
  );
}

export default SearchSort;
