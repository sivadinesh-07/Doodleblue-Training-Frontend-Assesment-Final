
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productsSlice";

import "./Home.css";

const PRODUCTS_PER_PAGE = 12;

function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const searchText = (
    searchParams.get("search") || ""
  ).trim().toLowerCase();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        items
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [items]);

  const filteredProducts = useMemo(() => {
    let result = items.filter((product) => {
      const title = (product.title || "").toLowerCase();
      const brand = (product.brand || "").toLowerCase();
      const productCategory = (
        product.category || ""
      ).toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        brand.includes(searchText) ||
        productCategory.includes(searchText);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    return result;
  }, [items, searchText, category, sortBy]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, category, sortBy]);

  const handleReset = () => {
    setCategory("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  return (
    <main className="home-page">
      <section className="home-heading">
        <div>
          <span className="home-eyebrow">
            THE LAPTOP COLLECTION
          </span>

          <h1>
            Find your <span>next laptop.</span>
          </h1>

          <p>
            The right technology for your next big thing.
          </p>
        </div>

        <div className="home-heading-badge">
          <span>✦</span>
          Your everyday tech destination
        </div>
      </section>

      <section className="home-catalog">
        <div className="home-catalog-heading">
          <div>
            <h2>Explore laptops</h2>
            <p>
              Discover your next everyday essential.
            </p>
          </div>

          {status === "succeeded" && (
            <span className="home-result-count">
              {filteredProducts.length} products
            </span>
          )}
        </div>

        <div className="home-toolbar">
          <div className="home-filter-group">
            <label htmlFor="home-category">
              Category
            </label>

            <select
              id="home-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    )}
                </option>
              ))}
            </select>
          </div>

          <div className="home-filter-group">
            <label htmlFor="home-sort">
              Sort by
            </label>

            <select
              id="home-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="name">Name: A to Z</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <button
            type="button"
            className="home-reset-btn"
            onClick={handleReset}
          >
            Reset filters
          </button>
        </div>

        {searchText && (
          <div className="home-search-message">
            Showing results for{" "}
            <strong>"{searchParams.get("search")}"</strong>
          </div>
        )}

        {status === "loading" && (
          <div className="home-state">
            <div className="home-loader"></div>
            <p>Loading your laptops...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="home-state home-error">
            <h3>We couldn't load the laptops.</h3>
            <p>{error || "Please try again."}</p>

            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
            >
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" &&
          filteredProducts.length === 0 && (
            <div className="home-state home-empty">
              <h3>No matching laptops found</h3>
              <p>
                Try another search or reset your filters.
              </p>

              <button
                type="button"
                onClick={handleReset}
              >
                Reset filters
              </button>
            </div>
          )}

        {status === "succeeded" &&
          currentProducts.length > 0 && (
            <>
              <div className="home-product-grid">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="home-pagination">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                  >
                    ← Previous
                  </button>

                  <div className="home-page-numbers">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        type="button"
                        key={page}
                        className={
                          safePage === page
                            ? "active"
                            : ""
                        }
                        aria-current={
                          safePage === page
                            ? "page"
                            : undefined
                        }
                        onClick={() =>
                          setCurrentPage(page)
                        }
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
      </section>
    </main>
  );
}

export default Home;
