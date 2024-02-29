import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { LogoHeaderR } from "../../../assets/icons.jsx";
import axios from "axios";
import Navbar from "../../molecules/Navbar/Navbar.jsx";
import { SearchBar } from "../../SearchBar.jsx";
import { Suggestions } from "../../Suggestions.jsx";
import { useCart } from "../../../CartContext.jsx"; // Importa useCart
import CartDisplay from "../../CartDisplay.jsx"; // Importa CartDisplay
import DarkButton from "../../atoms/DarkButton/DarkButton.jsx";
// import VoiceControl from './DarkButton/VoiceControl.jsx';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const { cartItems } = useCart();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `/api/suggestions?searchTerm=${searchTerm}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleSuggestionClick = (selectedSuggestion) => {
    setSearchTerm(selectedSuggestion.title);
  };

  const handleSearchClickOutside = () => {
    // Lógica para cerrar las sugerencias
    // No se utiliza setResults([]); ya que no hay un estado results en este componente
  };

  const showCart = () => {
    setCartVisible(true);
  };

  const hideCart = () => {
    setCartVisible(false);
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  return (
    <div className="main-header">
      <Link to="/" className="logo-header-r">
        <LogoHeaderR />
      </Link>
      <header className="header-test">
        {/* <VoiceControl onVoiceCommand={handleVoiceCommand} /> */}
        <DarkButton />
        <div className="search-container">
          <SearchBar
            setResults={setSuggestions} // Asegúrate de que estás pasando setResults correctamente
            onChange={handleSearchChange}
            onClickOutside={handleSearchClickOutside}
          />
          <Suggestions
            results={suggestions} // Utiliza results en lugar de suggestions
            onClick={handleSuggestionClick}
          />
        </div>
        <Navbar />
        <button className="cart-header" onClick={showCart}>
          🛒 {cartItems.length > 0 && `(${cartItems.length})`}
        </button>
        {cartVisible && <CartDisplay hideCart={hideCart} />}{" "}
        {/*Renderiza CartDisplay solo cuando cartVisible es true */}
        <button
          onClick={closeCart}
          className={`close-cart-btn ${cartVisible ? "visible" : "hidden"}`}
        >
          X
        </button>
      </header>
    </div>
  );
};

export default Header;
