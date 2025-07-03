import Link from "next/link";
import module from "./Header.module.css";
import Navbar from "./Navbar";
const Header = () => {
  return (
    <header className={module.header}>
      <Navbar />
      <div className={module.right}>
        <Link className={module.btn} href="/login">
          Login
        </Link>

        <Link className={module.btn} href="/register">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
