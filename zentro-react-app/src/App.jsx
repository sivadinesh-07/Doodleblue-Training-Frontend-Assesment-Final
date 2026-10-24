
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />

      <div className="app-content" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="*"
            element={
              <main className="app-not-found">
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/">Back to home</a>
              </main>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
