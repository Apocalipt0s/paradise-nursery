import { Link, Route, Routes } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Leaf, Sparkles, Truck, Heart } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function LandingPage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grain" />
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-kicker"><span className="kicker-dot" /> A LITTLE MORE GREEN, EVERY DAY</div>
            <h1 id="hero-title">Find your<br /><em>happy place</em><br />in green<span className="hero-period">.</span></h1>
            <p>Meet your new favorite roommates. Beautiful houseplants, handpicked to make your space feel more like you.</p>
            <Link to="/plants" className="button button-lime hero-button">Get Started <ArrowUpRight size={20} /></Link>
            <div className="hero-social-proof"><div className="tiny-leaves" aria-hidden="true"><span>✳</span><span>✾</span><span>✳</span></div><span>Beautiful plants. Better everyday moments.</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a collection of lush indoor plants" role="img">
            <img src={`${import.meta.env.BASE_URL}hero-plants.svg`} alt="" />
            <div className="hero-sticker"><span>GOOD<br />THINGS<br />GROW</span><Sparkles size={20} /></div>
            <div className="hero-art-caption">your home, but greener. ↗</div>
          </div>
        </div>
        <div className="hero-side-label">NATURE LOOKS GOOD ON YOU — EST. 2024</div>
      </section>
      <section className="feature-band" aria-label="Why shop with Paradise Nursery">
        <div className="container feature-band-inner">
          <div><Leaf size={20} strokeWidth={1.6} /><span>Thoughtfully handpicked</span></div>
          <div><Truck size={21} strokeWidth={1.6} /><span>Careful delivery</span></div>
          <div><Heart size={20} strokeWidth={1.6} /><span>Plant-parent approved</span></div>
        </div>
      </section>
      <section className="intro-section">
        <div className="container intro-grid">
          <div><p className="eyebrow">GREEN IS ALWAYS IN STYLE <span>✳</span></p><h2>Small plants.<br /><em>Big mood.</em></h2></div>
          <div className="intro-right"><p>Whether you're after a leafy centerpiece or a tiny windowsill companion, we've got something growing for you.</p><Link to="/plants" className="text-action">Explore the collection <ArrowRight size={17} /></Link></div>
        </div>
        <div className="container home-teasers">
          <Link to="/plants" className="teaser teaser-one"><span className="teaser-eyebrow">01 / FRESH PICKS</span><img src={`${import.meta.env.BASE_URL}plants/monstera.svg`} alt="Monstera plant"/><div><span>Tropical beauties</span><ArrowUpRight size={21}/></div></Link>
          <Link to="/plants" className="teaser teaser-two"><span className="teaser-eyebrow">02 / EASY STARTERS</span><img src={`${import.meta.env.BASE_URL}plants/snake-plant.svg`} alt="Snake plant"/><div><span>Low-maintenance loves</span><ArrowUpRight size={21}/></div></Link>
          <Link to="/plants" className="teaser teaser-three"><span className="teaser-eyebrow">03 / LITTLE JOYS</span><img src={`${import.meta.env.BASE_URL}plants/echeveria.svg`} alt="Echeveria succulent"/><div><span>Mini green moments</span><ArrowUpRight size={21}/></div></Link>
        </div>
      </section>
      <AboutUs />
      <section className="closing-cta"><div className="container closing-content"><div><p className="eyebrow">READY WHEN YOU ARE <span>✳</span></p><h2>Let's grow<br /><em>something good.</em></h2></div><Link to="/plants" className="button button-lime">Shop all plants <ArrowUpRight size={20} /></Link></div></section>
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<main><AboutUs standalone /></main>} />
        <Route path="*" element={<main className="not-found container"><p className="eyebrow">404 — NOT FOUND</p><h1>We haven't planted that page yet.</h1><Link className="button button-dark" to="/">Back to home <ArrowUpRight size={17} /></Link></main>} />
      </Routes>
      <Footer />
    </div>
  );
}
