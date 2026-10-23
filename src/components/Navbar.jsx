import { Link, NavLink } from 'react-router-dom';
import { Leaf, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/CartSlice.jsx';

export default function Navbar() {
  const count = useSelector(selectCartCount);

  return (
    <>
      <div className="announcement">Good things grow here <span aria-hidden="true">✦</span> Free shipping on orders over $75</div>
      <header className="site-header">
        <div className="header-inner container">
          <Link className="brand" to="/" aria-label="Paradise Nursery home">
            <span className="brand-mark"><Leaf size={23} strokeWidth={1.8} /></span>
            <span className="brand-name">paradise<span> nursery.</span></span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/plants" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Plants</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Our story</NavLink>
          </nav>

          <div className="header-actions">
            <Link to="/plants" className="explore-link">Explore plants <ArrowUpRight size={15} /></Link>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'cart-link active' : 'cart-link'} aria-label={`Shopping cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
              <ShoppingBag size={21} strokeWidth={1.9} />
              <span className="cart-count" aria-live="polite">{count}</span>
              <span className="cart-word">Cart</span>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
