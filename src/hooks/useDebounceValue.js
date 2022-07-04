import { useEffect, useState } from "react"

const useDebounceValue = (searchTerm, delay = 500) => {
    const [debouncedVal, setDebouncedVal] = useState(searchTerm);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedVal(searchTerm);
        }, delay)

        return () => clearTimeout(timer);
    }, [searchTerm, delay]);

    return debouncedVal;
};

export default useDebounceValue;