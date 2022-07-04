import { useState, useCallback } from "react";
import "./styles.css";
import useSearch from "./hooks/useSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNbr, setPageNbr] = useState(1);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const { loading, error, books, hasMore } = useSearch(query, pageNbr);


  // gets executed whenever the element being referenced get changed / created
  const lastBookElementRef = useCallback( node => {
    if(loading) return;
    if(lastBookElementRef.current) lastBookElementRef.current.disconnect();

    lastBookElementRef.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && hasMore) {
          setPageNbr(prevPageNumber => prevPageNumber + 1)
        }
      });

      if(node) lastBookElementRef.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="App">
      <h1>Infinite Scrolling with react</h1>
      <div className="container" value={query} onChange={handleSearch}>
        <input type="text" />
        {
          books.map((book, index) => {
            if (books.length === index + 1) {
              return <div ref={lastBookElementRef} key={book}>{book}</div>
            } else {
              return <div key={book}>{book}</div>
            }
          })
        }
        {loading && <div> Loading...</div>}
        {error && <div>Something went wrong!!</div>}
      </div>
    </div>
  );
}
