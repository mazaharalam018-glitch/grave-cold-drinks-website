import { useMemo, useState } from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
export default function Drinks(){
 const [filter,setFilter]=useState('All'),[query,setQuery]=useState(''),[sort,setSort]=useState('featured');
 const categories=['All',...new Set(products.map(p=>p.category))];
 const list=useMemo(()=>{let items=products.filter(p=>(filter==='All'||p.category===filter)&&`${p.name} ${p.flavor} ${p.brand}`.toLowerCase().includes(query.toLowerCase()));if(sort==='price-low')items.sort((a,b)=>a.price-b.price);if(sort==='price-high')items.sort((a,b)=>b.price-a.price);return items},[filter,query,sort]);
 return <main className="inner-page"><section className="page-hero drinks-hero"><span className="eyebrow light">THE GRAVE COLLECTION / THE REFRESHMENT EDIT</span><motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}>Find your<br/><i>kind of cold.</i></motion.h1><p>From iconic cola favourites to crisp lemon-lime and bright orange fizz. Pick your mood, find your refreshment.</p><div className="drinks-hero-stats"><span><b>09</b> PICKS TO EXPLORE</span><span>COLA · LEMON-LIME · ORANGE · FIZZ</span></div></section>
 <section className="section shop-section"><div className="shop-heading"><div><span className="eyebrow">THE REFRESHMENT EDIT</span><h2>Choose your <i>vibe.</i></h2></div><p>Explore the collection, discover familiar favourites and add a little refreshment to your day.</p></div>
 <div className="shop-toolbar"><span>{list.length} DRINKS TO EXPLORE</span><div className="shop-controls"><label className="search-field"><Search size={17}/><input placeholder="Search drinks or brands" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button className="clear-search" onClick={()=>setQuery('')} aria-label="Clear search"><X size={14}/></button>}</label><label className="filter-select"><SlidersHorizontal size={16}/><select value={filter} onChange={e=>setFilter(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label className="filter-select sort-select"><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div></div>
 {list.length?<div className="product-grid">{list.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>:<div className="no-results">No drinks found. Try another search or category.</div>}
 <p className="catalog-note">Brand names and trademarks belong to their respective owners. GRAVE is an independent concept brand; third-party listings are for demonstration only. Prices are illustrative.</p>
 </section></main>
}
