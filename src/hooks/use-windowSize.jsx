import { useLayoutEffect, useState } from "react";

//hook to get windwo size
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  // @see https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
