import React from "react";
import "./App.css";
import SearchSort from "./components/SearchSort";
import booksList from "./data/booksList";

const title = "Search Books";

const App = () => {
  return (
    <div className="App">
      <nav style={{ backgroundColor: '#011627', color: '#41B883', padding: '15px', fontWeight: 'bold', fontSize: '20px', borderLeft: '5px solid #41B883', marginBottom: '20px' }}>
        {title}
      </nav>
      <SearchSort booksList={booksList} />
    </div>
  );
};

export default App;