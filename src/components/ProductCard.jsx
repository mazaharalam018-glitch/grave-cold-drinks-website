import { Link } from 'react-router-dom';
import { Plus, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
export default function ProductCard({product,index=0}) {
 const {add}=useCart();
 return <motion.article className="product-card" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.55,delay:(index%4)*.07,ease:[.22,1,.36,1]}} whileHover={{y:-7}}>
  <Link to={`/drinks/${product.id}`} className={`product-visual product-${product.tone||'default'}`} style={{'--product-bg':product.color}}>
   <span className="product-tag">{product.tag}</span>
   <img src={product.image} alt={`${product.name} drink`} loading="lazy" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('image-fallback')}}/>
   <span className="fallback-brand" aria-hidden="true">{product.brand||'GRAVE'}</span>
   <span className="product-view">Discover <ArrowUpRight size={16}/></span>
  </Link>
  <div className="product-meta"><div><Link to={`/drinks/${product.id}`} className="product-name">{product.name}</Link><span>{product.flavor} · {product.brand}</span></div><div className="product-buy"><b>₹{product.price}</b><button aria-label={`Add ${product.name} to bag`} onClick={()=>add(product)}><Plus size={18}/></button></div></div>
 </motion.article>
}
