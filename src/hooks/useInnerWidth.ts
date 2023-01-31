import { useEffect, useState } from "react";

export default function useInnerWidth(handler: () => void) {
  const [windowWidth, setWindowWidth] = useState(0); // window width size
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowResize);
      // tailwind responsive sm size가 640px
      if (!handler) return;
      // tailwind responsive sm size가 640px
      if (windowWidth > 641) {
        handler();
      }
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, [windowWidth]);
}
