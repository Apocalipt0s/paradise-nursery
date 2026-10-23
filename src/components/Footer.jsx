import { Link } from 'react-router-dom';
import { Leaf, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div><Link to="/" className="footer-brand"><Leaf size={19} /> paradise nursery.</Link><p>Bring a little nature inside. Every day.</p></div>
        <div className="footer-links"><Link to="/">Home</Link><Link to="/plants">Shop plants</Link><Link to="/about">Our story</Link><Link to="/cart">Your cart <ArrowUpRight size={13} /></Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Paradise Nursery. Made with love for plants.</span><span>Grow something good ✳</span></div>
    </footer>
  );
}
