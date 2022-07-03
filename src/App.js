import { useEffect, useState } from "react";
import "./styles.css";
import useSearch from "./hooks/useSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNbr, setPageNbr] = useState(1);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const { loading, error, books, hasMore } = useSearch(query, pageNbr);

  return (
    <div className="App">
      <h1>Infinite Scrolling with react</h1>
      <div className="container" value={query} onChange={handleSearch}>
        <input type="text" />
        <div className="">book 1</div>
        <div>Loading...</div>
        <div>Error</div>
      </div>
    </div>
  );
}
