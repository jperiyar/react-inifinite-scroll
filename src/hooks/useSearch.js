import { useEffect, useState } from "react";
import axios from "axios";

const useSearch = (query, pageNbr) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const URL = "http://openlibrary.org/search.json";

  // resets output
  useEffect(() => {
    setBooks([]);
  }, [query]);

  // handles api call
  useEffect(() => {
    let cancel;
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: URL,
      params: { q: query, page: pageNbr },
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    })
      .then((res) => {
        setLoading(false);
        setHasMore(res.data.docs.length > 0);
        setBooks((prevBooks) => {
          return [...new Set([...prevBooks, ...res.data.docs.map((book) => book.title)])];
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setLoading(false);
        setError(true);
      });

    return () => cancel();
  }, [query, pageNbr]);

  return { loading, error, books, hasMore };
};

export default useSearch;
