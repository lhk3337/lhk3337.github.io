import { Link } from "gatsby";

import React, { useEffect, useState } from "react";
import { cls } from "libs/cls";
import useInnerWidth from "hooks/useInnerWidth";
import { GatsbyImage } from "gatsby-plugin-image";
import useTheme from "hooks/useTheme";
import { useSiteMetadata } from "hooks/use-site-metadata";
import SmallMenuBtn from "./sm-menu-btn";
import MenuBtn from "./menu-btn";

interface Props {
  location?: string;
}
// 640px < window.innerWidth
export default function Nav({ location }: Props) {
  const [isMenu, setIsMenu] = useState(false); // side menu button handler
  const [preventScroll, setPreventScroll] = useState(false); // active sm nav menu scroll prevent
  const [theme, themeToggler] = useTheme();

  const { title: siteTitle, file } = useSiteMetadata();
  useInnerWidth(() => setIsMenu(false));
  useInnerWidth(() => setPreventScroll(false));

  useEffect(() => {
    if (preventScroll) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [preventScroll]);

  const onClickNav = () => {
    setIsMenu((prev) => !prev);
    setPreventScroll((prev) => !prev);
  };

  const isDarkClick = () => {
    return themeToggler();
  };

  return (
    <>
      <nav className="nav_menu">
        <Link to="/" className="flex items-center space-x-10">
          <GatsbyImage image={file.childImageSharp.gatsbyImageData} alt="logos" className="rounded-full" />
          <h1 className="text-2xl font-bold">{siteTitle}</h1>
        </Link>
        {/* sm screen menu buttons */}
        <SmallMenuBtn theme={theme} isMenu={isMenu} isDarkClick={isDarkClick} onClickNav={onClickNav} />

        {/* large screen menu buttons */}
        <MenuBtn location={location} isMenu={isMenu} isDarkClick={isDarkClick} theme={theme} />
      </nav>
    </>
  );
}
