import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://via.placeholder.com/150", cost: "$15" },
        { name: "Spider Plant", image: "https://via.placeholder.com/150", cost: "$12" },
        { name: "Peace Lily", image: "https://via.placeholder.com/150", cost: "$18" },
        { name: "Boston Fern", image: "https://via.placeholder.com/150", cost: "$14" },
        { name: "Rubber Plant", image: "https://via.placeholder.com/150", cost: "$20" },
        { name: "Aloe Vera", image: "https://via.placeholder.com/150", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://via.placeholder.com/150", cost: "$22" },
        { name: "Jasmine", image: "https://via.placeholder.com/150", cost: "$25" },
        { name: "Rosemary", image: "https://via.placeholder.com/150", cost: "$15" },
        { name: "Mint", image: "https://via.placeholder.com/150", cost: "$10" },
        { name: "Eucalyptus", image: "https://via.placeholder.com/150", cost: "$18" },
        { name: "Gardenia", image: "https://via.placeholder.com/150", cost: "$24" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://via.placeholder.com/150", cost: "$25" },
        { name: "Pothos", image: "https://via.placeholder.com/150", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://via.placeholder.com/150", cost: "$28" },
        { name: "Succulent", image: "https://via.placeholder.com/150", cost: "$8" },
        { name: "Jade Plant", image: "https://via.placeholder.com/150", cost: "$15" },
        { name: "Chinese Evergreen", image: "https://via.placeholder.com/150", cost: "$20" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-title">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#" onClick={() => setShowCart(false)}>Plants</a>
          <a href="#" onClick={() => setShowCart(true)}>
            Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      disabled={addedToCart[plant.name]} 
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
