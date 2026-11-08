import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight, ArrowRight, Instagram, Facebook, Youtube, Mail, UserRound } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Header({onCart}) {
 const [open,setOpen]=useState(false); const {count}=useCart(); const {user}=useAuth(); const loc=useLocation();
 const links=[['Home','/'],['Drinks','/drinks'],['Our Story','/about'],['Journal','/journal'],['Contact','/contact']];
 return <header className="header">
   <Link to="/" className="brand" onClick={()=>setOpen(false)}>GRAVE<span>®</span><small> COLD DRINKS</small></Link>
   <nav className={open?'nav nav-open':'nav'} aria-label="Main navigation">
    {links.map(([n,p])=><NavLink key={p} to={p} end={p==='/'} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'active':''}>{n}</NavLink>)}
   </nav>
   <div className="header-actions">
    <Link to={user?"/account":"/login"} className="header-account" aria-label={user?"Open your account":"Sign in"} onClick={()=>setOpen(false)}>{user?<span className="header-user-avatar">{user.name.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase()}</span>:<UserRound size={18}/>}<span>{user?"MY ACCOUNT":"SIGN IN"}</span></Link><button className="header-shop" onClick={onCart}>SHOP THE DROP <ArrowUpRight size={15}/></button>
    <button className="icon-btn cart-trigger" aria-label="Open shopping bag" onClick={onCart}><ShoppingBag size={21}/><span className="cart-count">{count}</span></button>
    <button className="icon-btn menu-trigger" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   </div>
 </header>
}
export function Footer(){
 const [email,setEmail]=useState(''),[joined,setJoined]=useState(false);
 const submit=e=>{e.preventDefault();if(email.trim())setJoined(true)};
 return <footer className="footer">
  <div className="footer-top">
   <div className="footer-brand-block">
    <Link to="/" className="brand footer-brand">GRAVE<span>®</span></Link>
    <p className="footer-tagline">COLD DRINKS. DEEPER VIBES.</p>
    <p>Big flavour. Ice-cold energy.<br/>Made for wherever life takes you.</p>
    <div className="socials"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15}/></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={15}/></a><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={15}/></a></div>
   </div>
   <div className="footer-links">
    <div><b>EXPLORE</b><Link to="/drinks">All drinks</Link><Link to="/about">Our story</Link><Link to="/journal">Journal</Link><a href="/#reviews">Customer reviews</a><a href="/#faq">FAQs</a><Link to="/contact">Contact</Link></div>
    <div><b>THE DETAILS</b><a href="/#faq">FAQs & support</a><Link to="/contact">Delivery enquiries</Link><Link to="/contact">Partnerships</Link><Link to="/login">Member sign in</Link><Link to="/account">My account</Link><span>India · Everywhere</span></div>
    <div className="footer-news"><b>STAY IN THE LOOP</b><p>Fresh drops, cold updates and good things in your inbox.</p>
     {joined?<div className="newsletter-success">You’re on the list. Stay refreshed. ✓</div>:<form className="newsletter-form" onSubmit={submit}><label className="sr-only" htmlFor="footer-email">Email address</label><Mail size={16}/><input id="footer-email" type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/><button aria-label="Subscribe"><ArrowRight size={17}/></button></form>}
     <small>By subscribing, you agree to receive GRAVE updates.</small>
    </div>
   </div>
  </div>
  <div className="footer-statement"><span>STAY COLD.</span><span>STAY BOLD.</span><span>STAY GRAVE.</span></div>
  <div className="footer-bottom"><span>© 2026 GRAVE DRINKS. ALL RIGHTS RESERVED.</span><span>Independent concept brand · Drink responsibly</span><Link to="/contact">Privacy & enquiries <ArrowUpRight size={12}/></Link></div>
 </footer>
}
