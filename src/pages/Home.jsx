import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Snowflake, Leaf, Droplets, Zap } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ReviewsFAQ from '../components/ReviewsFAQ';
const fade={initial:{opacity:0,y:22},animate:{opacity:1,y:0},transition:{duration:.7,ease:[.22,1,.36,1]}};
export default function Home(){return <main><section className="hero"><div className="hero-bg"/><div className="hero-shade"/><div className="hero-copy"><span className="eyebrow light">COLD DRINKS. DEEPER VIBES.</span><motion.h1 {...fade}>More than<br/>just a <i>drink.</i></motion.h1><p>GRAVE brings you bold, refreshing cold drinks crafted for the moments that matter.</p><Link to="/drinks" className="btn btn-outline">Explore drinks <ArrowRight size={16}/></Link><div className="hero-index"><b>01</b><span/><small>04 — THE COLLECTION</small></div></div><div className="hero-product"><div className="hero-bottle-glow"/><img src="https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=90" alt="Ice-cold dark GRAVE inspired drink"/><span className="vertical-note">PURE COLD · BOLD TASTE</span></div><div className="hero-caption">THE ART OF<br/>STAYING REFRESHED <ArrowUpRight size={16}/></div><div className="hero-scroll">SCROLL TO EXPLORE <span/></div></section>
<section className="qualities"><div><Snowflake/><span>Ice cold<br/>refreshment</span></div><div><Leaf/><span>Natural<br/>inspiration</span></div><div><Droplets/><span>Clean, crisp<br/>finish</span></div><div><Zap/><span>Bold taste<br/>always</span></div></section>

<section className="pour-film-section" aria-labelledby="pour-film-title">
 <div className="pour-film-copy">
  <span className="eyebrow">THE MOMENT BEFORE THE FIRST SIP</span>
  <h2 id="pour-film-title">Hear the fizz.<br/><i>Feel the cold.</i></h2>
  <p>A slow pour, a little sparkle, and that first ice-cold moment. This is refreshment in motion.</p>
  <Link to="/drinks" className="pour-film-link">Find your next favourite <ArrowRight size={16}/></Link>
  <div className="pour-film-caption"><span>GRAVE FILM / 001</span><span>19 SEC · THE POUR</span></div>
 </div>
 <motion.div className="pour-film-frame" initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.8,ease:[.22,1,.36,1]}}>
  <video
   className="pour-film-video"
   autoPlay
   muted
   loop
   playsInline
   disablePictureInPicture
   controlsList="nodownload noplaybackrate noremoteplayback"
   preload="auto"
   poster="/images/grave-video-poster.jpg"
   aria-label="Close-up video of a cold cola drink being poured over ice"
   onContextMenu={e=>e.preventDefault()}
   draggable="false"
  >
   <source src="/videos/grave-cold-pour.mp4" type="video/mp4"/>
   Your browser does not support the video element.
  </video>
  <span className="pour-film-video-label">POUR. PAUSE. REFRESH.</span><span className="pour-film-video-glow" aria-hidden="true"></span>
 </motion.div>
</section>
<section className="cola-spotlight">
 <div className="cola-spotlight-image"><img src="/images/cola-classic-feature.png" alt="Classic Coca-Cola glass bottle with sparkling cola and ice" loading="lazy"/><span className="cola-image-stamp">THE CLASSICS<br/>NEVER GO COLD</span></div>
 <div className="cola-spotlight-copy"><span className="eyebrow">COLA CLASSICS / THE ICON EDIT</span><h2>A timeless<br/>kind of <i>refreshment.</i></h2><p>Some flavours never need an introduction. Explore the familiar cola classics alongside the GRAVE collection.</p><Link to="/drinks" className="text-link">Explore the collection <ArrowRight size={15}/></Link><small>BRAND IMAGE FEATURE · NOT AN OFFICIAL PARTNERSHIP</small></div>
</section>
<section className="section collection-section"><div className="section-intro"><div><span className="eyebrow">01 / THE REFRESHMENT EDIT</span><h2>Find your<br/><i>favorite.</i></h2></div><div className="intro-right"><p>From GRAVE originals to iconic cola classics and citrus fizz, find a flavour for every kind of moment.</p><Link to="/drinks" className="text-link">View all flavours <ArrowRight size={15}/></Link></div></div><div className="product-grid">{products.slice(0,4).map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></section>
<section className="brand-marquee" aria-label="Drink collection highlights"><div>GRAVE ORIGINALS <b>✳</b> COLA CLASSICS <b>✳</b> CITRUS & FIZZ <b>✳</b> GOOD TASTE ONLY <b>✳</b> GRAVE ORIGINALS <b>✳</b> COLA CLASSICS <b>✳</b></div></section><section className="story-banner"><div className="story-image"/><div className="story-copy"><span className="eyebrow light">02 / OUR STORY</span><h2>Born from<br/>nature’s <i>cold.</i></h2><p>We believe refreshment should feel like a moment away from everything. Inspired by wild places, made for the everyday escape.</p><Link to="/about" className="btn btn-outline">Discover our story <ArrowRight size={15}/></Link></div></section>
<section className="manifesto"><span className="eyebrow">A DIFFERENT KIND OF REFRESHMENT</span><h2>Find your wild.<br/><i>Feel the cold.</i></h2><Link to="/journal" className="text-link">Read the GRAVE journal <ArrowUpRight size={15}/></Link></section><ReviewsFAQ/>
</main>}
