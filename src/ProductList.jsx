import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus, Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { addItem, selectCartItems } from './redux/CartSlice.jsx';
import { categories, formatPrice, plants } from './data/plants.js';

function ProductCard({ plant, inCart, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={plant.image} alt={`${plant.name} houseplant`} loading="lazy" />
        <span className="product-tag">{plant.care} care</span>
      </div>
      <div className="product-details">
        <div className="product-title-row"><h3>{plant.name}</h3><strong>{formatPrice(plant.price)}</strong></div>
        <p>{plant.description}</p>
        <div className="product-bottom"><span className="light-note">✳ {plant.light}</span><button type="button" className={`add-button ${inCart ? 'added' : ''}`} disabled={inCart} onClick={() => onAdd(plant)} aria-label={inCart ? `${plant.name} already in cart` : `Add ${plant.name} to cart`}>{inCart ? <><Check size={17} /> Added</> : <><Plus size={18} /> Add to cart</>}</button></div>
      </div>
    </article>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const inCartIds = useMemo(() => new Set(cartItems.map((item) => item.id)), [cartItems]);
  const query = search.trim().toLowerCase();
  const visibleCategories = categories.map((category) => ({
    ...category,
    products: plants.filter((plant) => plant.category === category.id && (activeCategory === 'all' || activeCategory === category.id) && (plant.name.toLowerCase().includes(query) || plant.description.toLowerCase().includes(query))),
  })).filter((category) => category.products.length > 0);
  const visibleCount = visibleCategories.reduce((total, category) => total + category.products.length, 0);

  return (
    <main className="shop-page">
      <section className="shop-hero"><div className="container shop-hero-inner"><div><p className="eyebrow">THE PARADISE COLLECTION <span>✳</span></p><h1>Find your next<br /><em>plant crush.</em></h1><p>From sun-loving leafy legends to easygoing little companions, there's a green friend for everyone.</p></div><div className="shop-hero-doodle" aria-hidden="true">✳<span>the<br/>greenhouse</span></div></div></section>
      <div className="container shop-content">
        <div className="catalog-controls"><div className="category-filters" role="group" aria-label="Filter by plant category"><button className={activeCategory === 'all' ? 'filter-chip selected' : 'filter-chip'} onClick={() => setActiveCategory('all')}>All plants <span>18</span></button>{categories.map((category) => <button key={category.id} className={activeCategory === category.id ? 'filter-chip selected' : 'filter-chip'} onClick={() => setActiveCategory(category.id)}>{category.title}</button>)}</div><label className="search-box"><Search size={18} /><span className="sr-only">Search plants</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search plants..." type="search" /></label></div>
        <div className="catalog-meta"><span><SlidersHorizontal size={15} /> Showing {visibleCount} {visibleCount === 1 ? 'plant' : 'plants'}</span><span>Grown with care. Chosen for you. ✳</span></div>
        {visibleCategories.length === 0 ? <section className="no-results"><h2>No plants found</h2><p>Try another plant name or explore the full collection.</p><button className="button button-dark" onClick={() => {setSearch('');setActiveCategory('all');}}>See all plants <ArrowRight size={17} /></button></section> : visibleCategories.map((category) => (
          <section className="plant-category" key={category.id} aria-labelledby={`category-${category.id}`}>
            <div className="category-heading"><div><p className="category-kicker">{category.subtitle}</p><h2 id={`category-${category.id}`}>{category.title}<span className="category-star">✳</span></h2><p>{category.description}</p></div><span className="category-index">0{categories.findIndex((entry) => entry.id === category.id) + 1} / 03</span></div>
            <div className="products-grid">{category.products.map((plant) => <ProductCard key={plant.id} plant={plant} inCart={inCartIds.has(plant.id)} onAdd={(product) => dispatch(addItem(product))} />)}</div>
          </section>
        ))}
        <section className="shop-bottom-banner"><div><span>✳ A LITTLE REMINDER</span><h2>Keep growing. Keep glowing.</h2><p>New plants are a pretty good reason to smile.</p></div><Link to="/cart" className="button button-lime">View your cart <ShoppingBag size={18} /></Link></section>
      </div>
    </main>
  );
}
