import { useState, useCallback, useMemo } from "react";
import debounce from 'lodash/debounce'
import "./styles.css";
import useSearch from "./hooks/useSearch";
import useDebounceValue from "./hooks/useDebounceValue";
import useDebounceMethod from "./hooks/useDebounceMethod";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNbr, setPageNbr] = useState(1);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  // Approach 1 - debouncing the search term change
  const debouncedVal = useDebounceValue(query);

  // Approach 2 - deboucing the change event itself.
  const debouncedChangeHandler = useMemo(
    () => debounce(handleInput, 300)
    , []);


  // const { loading, error, books, hasMore } = useSearch(debouncedVal, pageNbr); // Approach 1 - debouncing the search term change
  const { loading, error, books, hasMore } = useSearch(query, pageNbr);// Approach 2 - deboucing the change event itself.


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
      <div className="container" value={query} onChange={debouncedChangeHandler}>
        <input type="text" />
        { books.length > 0 ?
          books.map((book, index) => {
            if (books.length === index + 1) {
              return <div ref={lastBookElementRef} key={book}>{book}</div>
            } else {
              return <div key={book}>{book}</div>
            }
          }) : 
          !loading && <div> No matching records found!</div>
        }
        {loading && <div> Loading...</div>}
        {error && <div>Something went wrong!!</div>}
      </div>
    </div>
  );
}
