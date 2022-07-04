import { useEffect, useState } from "react";

const useDebounceMethod = (fn, delay = 500) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            return fn.apply(this, args);
        }, delay);
    
        return () => clearTimeout(timer);
    }, [fn, delay]);
};

export default useDebounceMethod;