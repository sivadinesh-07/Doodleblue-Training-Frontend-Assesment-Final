
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectTotalItems } from "../redux/slices/cartSlice";

import "./Header.css";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const totalItems = useSelector(selectTotalItems);

  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (e) => {
    e.preventDefault();

    const searchText = search.trim();

    if (searchText) {
      navigate(`/home?search=${encodeURIComponent(searchText)}`);
    } else {
      navigate("/home");
    }
  };

  const handleHome = () => {
    setSearch("");
  };

  return (
    <header className="zentro-header">
      <div className="header-container">

        <Link
          to="/"
          className="zentro-logo"
          onClick={handleHome}
        >
          zentro<span>.</span>
        </Link>

        <nav className="header-navigation">
          <Link
            to="/"
            className="header-nav-link"
            onClick={handleHome}
          >
            Home
          </Link>

          <Link
            to="/home"
            className="header-nav-link"
          >
            Laptops
          </Link>
        </nav>

        <form
          className="header-search"
          onSubmit={handleSearch}
        >
          <span className="header-search-icon">
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </span>

          <input
            type="search"
            placeholder="Search laptops..."
            aria-label="Search laptops"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>

        <div className="header-actions">
          <Link
            to="/cart"
            className="header-cart-link"
            aria-label={`Shopping cart, ${totalItems} items`}
          >
            <svg
              viewBox="0 0 24 24"
              width="23"
              height="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            <span className="header-cart-label">
              Cart
            </span>

            <span className="header-cart-count">
              {totalItems}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;
