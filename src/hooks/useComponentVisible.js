import { useState, useRef, useEffect } from "react";

const useComponentVisible = initalState => {
  const [isComponentVisible, setIsComponentVisible] = useState(initalState);
  const ref = useRef(null);

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.addEventListener("click", handleClickOutside);
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useComponentVisible;
