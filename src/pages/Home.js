// src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // External CSS for styling

const shops = [
  { id: 1, name: "Shop1" },
  { id: 2, name: "Shop2" },
  { id: 3, name: "Shop3" },
  { id: 4, name: "Shop4" },
  { id: 5, name: "Shop5" }
];

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">เลือก ร้านค้า</h1>
      <div className="shops-list">
        {shops.map((shop) => (
          <Link 
            key={shop.id} 
            to={`/menu/${shop.id}`} 
            className="shop-link"
          >
            {shop.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
