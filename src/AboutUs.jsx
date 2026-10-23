import { Link } from 'react-router-dom';
import { ArrowUpRight, HeartHandshake, Sprout, Truck } from 'lucide-react';

const values = [
  { icon: Sprout, heading: 'Grown with intention', text: 'Thoughtfully selected greenery for every home, skill level, and sunny corner.' },
  { icon: HeartHandshake, heading: 'People before plants', text: 'Helpful care guidance and a friendly team who genuinely love growing things.' },
  { icon: Truck, heading: 'Packed with care', text: 'Each order is handled gently so your new plant arrives ready to settle in.' },
];

export default function AboutUs({ standalone = false }) {
  return (
    <section className={`about-section ${standalone ? 'about-standalone' : ''}`} id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-art" aria-hidden="true">
            <div className="about-art-circle"><span className="about-art-leaf">❧</span></div>
            <div className="about-art-tag">A little green goes a long way <span>✳</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">OUR LITTLE STORY <span>✳</span></p>
            <h2>More than plants.<br /><em>A breath of fresh air.</em></h2>
            <p className="body-lead">At Paradise Nursery, we believe every space deserves a little life. What started as a simple love for greenery has grown into a welcoming online plant shop for curious beginners and seasoned plant parents alike.</p>
            <p>We bring together beautiful, carefully selected houseplants and down-to-earth care tips, making it easier to grow your own peaceful corner. From resilient desk companions to bold tropical statement pieces, there is a plant for every kind of home.</p>
            <Link to="/plants" className="text-action">Find your new favorite plant <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        {standalone && <div className="values-grid">{values.map(({ icon: Icon, heading, text }) => (
          <article className="value" key={heading}><div className="value-icon"><Icon size={22} /></div><h3>{heading}</h3><p>{text}</p></article>
        ))}</div>}
      </div>
    </section>
  );
}
