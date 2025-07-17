// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);

  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch featured
  }, [dispatch]);

  useEffect(() => {
    // Fetch categories
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));

    // Fetch new arrivals
    fetch('https://dummyjson.com/products?limit=8&skip=8')
      .then(res => res.json())
      .then(data => setNewArrivals(data.products));
  }, []);

  return (
    <div className="home-page">
      <HeroSection />

      <section className="section-title">
        <h2>Featured Products</h2>
      </section>

      <div className="product-grid">
        {status === 'loading' && <p>Loading...</p>}
        {products && products.map(p => (
          <div key={p.id} className="product-card">
            <h4>{p.title}</h4>
            <p>{p.price} ₹</p>
          </div>
        ))}
      </div>

      <section className="section-title">
        <h2>New Arrivals</h2>
      </section>

      <div className="product-grid">
        {newArrivals && newArrivals.map(p => (
          <div key={p.id} className="product-card">
            <h4>{p.title}</h4>
            <p>{p.price} ₹</p>
          </div>
        ))}
      </div>

      <section className="section-title">
        <h2>Shop by Categories</h2>
      </section>

      <div className="category-grid">
        {categories && categories.map((cat, index) => (
          <div key={index} className="category-card">
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
