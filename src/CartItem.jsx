import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, ShieldCheck } from 'lucide-react';
import { decrementQuantity, incrementQuantity, removeItem, selectCartCount, selectCartItems, selectCartTotal } from './redux/CartSlice.jsx';
import { formatPrice } from './data/plants.js';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartTotal);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;

  return (
    <main className="cart-page">
      <div className="container cart-container">
        <div className="cart-breadcrumb"><Link to="/plants">Shop plants</Link><span>/</span><span>Your cart</span></div>
        <div className="cart-topline"><div><p className="eyebrow">YOUR LITTLE GREEN HAUL <span>✳</span></p><h1>Your shopping <em>cart.</em></h1><p>{count === 0 ? 'Your next plant adventure starts here.' : `Looking good! You have ${count} ${count === 1 ? 'plant' : 'plants'} in your cart.`}</p></div><span className="cart-heading-count">{count.toString().padStart(2, '0')} {count === 1 ? 'ITEM' : 'ITEMS'}</span></div>
        {items.length === 0 ? (
          <section className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={38} strokeWidth={1.4} /></div><h2>Your cart is feeling a little empty.</h2><p>Let's find the perfect green addition to your space.</p><Link to="/plants" className="button button-dark">Explore plants <ArrowRight size={18} /></Link></section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Shopping cart items"><div className="cart-list-header"><span>PRODUCT</span><span>QUANTITY</span><span>TOTAL</span></div>{items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={`${item.name} houseplant`} className="cart-item-image" />
                <div className="cart-item-info"><h2>{item.name}</h2><p>{formatPrice(item.price)} each</p><button className="remove-link" type="button" onClick={() => dispatch(removeItem(item.id))} aria-label={`Remove ${item.name} from cart`}><Trash2 size={14} /> Remove</button></div>
                <div className="quantity-control" aria-label={`Quantity of ${item.name}`}><button type="button" onClick={() => dispatch(decrementQuantity(item.id))} aria-label={`Decrease quantity of ${item.name}`}><Minus size={14}/></button><span aria-live="polite">{item.quantity}</span><button type="button" onClick={() => dispatch(incrementQuantity(item.id))} aria-label={`Increase quantity of ${item.name}`}><Plus size={14}/></button></div>
                <strong className="cart-item-total">{formatPrice(item.price * item.quantity)}</strong>
              </article>
            ))}<Link to="/plants" className="continue-link"><ArrowLeft size={18} /> Continue shopping</Link></section>
            <aside className="order-summary"><p className="summary-eyebrow">READY TO BLOOM?</p><h2>Order summary</h2><div className="summary-line"><span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-line"><span>Estimated shipping</span><strong>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</strong></div>{shipping > 0 && <p className="free-shipping-hint">You're {formatPrice(75 - subtotal)} away from free shipping.</p>}<div className="summary-total"><span>Order total</span><strong>{formatPrice(subtotal + shipping)}</strong></div><button className="button button-dark checkout-button" onClick={() => setShowCheckoutMessage(true)}>Checkout <ArrowRight size={19} /></button>{showCheckoutMessage && <div className="checkout-message" role="status"><span>✳</span> Checkout coming soon! Thanks for growing with us.</div>}<p className="checkout-note"><ShieldCheck size={16} /> Your future plants are in good hands.</p></aside>
          </div>
        )}
      </div>
    </main>
  );
}
