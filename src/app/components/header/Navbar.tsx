"use client"; //this is a client component convert from server backend to front-end

import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import module from "./Header.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={module.navbar}>
      <div>
        <Link href="/" className={module.logo}>
          CLOUD
          <GrTechnology />
          HOSTING
        </Link>
        <div className={module.menu}>
          {
            
            toggle ? (
              <AiOutlineClose onClick={() => setToggle((prev) => !prev)} />
            ) : (
              <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
            )
          }
        </div>
      </div>
      <div
        className={module.navLinksWrapper}
        style={{
          clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
        }}
      >
        <ul className={module.navlinks}>
          <Link
            onClick={() => setToggle(false)}
            className={module.navlink}
            href="/"
          >
            Home
          </Link>

          <Link
            onClick={() => setToggle(false)}
            className={module.navlink}
            href="/about"
          >
            About
          </Link>

          <Link
            onClick={() => setToggle(false)}
            className={module.navlink}
            href="/article"
          >
            Article
          </Link>

          <Link
            onClick={() => setToggle(false)}
            className={module.navlink}
            href="/search"
          >
            Search
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={module.navlink}
            href="/admin"
          >
            Admin Dashboard
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
