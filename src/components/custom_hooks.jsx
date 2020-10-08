// Custom hook examples: https://levelup.gitconnected.com/two-simple-reusable-custom-hooks-for-your-react-apps-a0275724f8ab
// https://usehooks.com/

import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

// Hook that gets dimensions of the user's screen
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    onChange: (e) => {
      setValue(e.target.value || e.target.innerText);
    },
  };
};
