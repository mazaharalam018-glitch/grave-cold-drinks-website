import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, MessageCircle, ShieldCheck, Send, Quote, Sparkles, ArrowUpRight } from 'lucide-react';

const starterReviews = [
 {id:'r1',name:'Aarav M.',city:'Lucknow',rating:5,title:'That ice-cold first sip.',body:'Really liked the crisp citrus finish. The product cards make it easy to explore the range.',date:'Community sample'},
 {id:'r2',name:'Sana K.',city:'Delhi',rating:5,title:'Clean, bold and refreshing.',body:'Lime Rush is my pick. Love the fresh look and the simple flavour descriptions.',date:'Community sample'},
 {id:'r3',name:'Rohan P.',city:'Noida',rating:4,title:'A fun collection.',body:'Good variety across cola and citrus. Looking forward to seeing more flavours added.',date:'Community sample'}
];
const faqs = [
 {q:'What drinks can I explore at GRAVE?',a:'The collection includes GRAVE-inspired originals alongside familiar cola and citrus-fizz catalogue entries. Browse the Drinks page to explore flavours, categories and product details.'},
 {q:'Are the drinks available for delivery?',a:'This version is a frontend storefront demo. Live delivery zones, stock availability and shipping charges will appear once a store and backend ordering system are connected.'},
 {q:'How do I add drinks to my bag?',a:'Open the Drinks page, choose a product and use the plus button or product detail page to add it to your shopping bag. You can update quantities in the bag drawer.'},
 {q:'Can I build a mixed-flavour pack?',a:'A mixed-pack builder is a planned upgrade. For now, add individual drinks to your bag and adjust quantities there.'},
 {q:'How can I contact the GRAVE team?',a:'Use the Contact page to send an enquiry. The current demo validates the form locally; email delivery will need a connected backend or email service.'},
 {q:'Are product prices and brand listings official?',a:'No. This is an independent concept website. Third-party brand names belong to their respective owners, and displayed prices and some catalogue details are illustrative demo content.'}
];
function Stars({value=5,size=15}){return <span className="review-stars" aria-label={`${value} out of 5 stars`}>{[1,2,3,4,5].map(n=><Star key={n} size={size} fill={n<=value?'currentColor':'none'} strokeWidth={1.6}/>)}</span>}
export default function ReviewsFAQ(){
 const [reviews,setReviews]=useState(()=>{try{const saved=localStorage.getItem('grave_reviews_v1');return saved?JSON.parse(saved):starterReviews}catch{return starterReviews}});
 const [rating,setRating]=useState(5),[name,setName]=useState(''),[city,setCity]=useState(''),[title,setTitle]=useState(''),[body,setBody]=useState(''),[sent,setSent]=useState(false),[openFaq,setOpenFaq]=useState(0),[showForm,setShowForm]=useState(false);
 const avg=useMemo(()=>reviews.length?(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1):'0.0',[reviews]);
 const submit=e=>{e.preventDefault();const next=[{id:`r${Date.now()}`,name:name.trim(),city:city.trim(),rating,title:title.trim(),body:body.trim(),date:'Just now'},...reviews];setReviews(next);try{localStorage.setItem('grave_reviews_v1',JSON.stringify(next))}catch{}setName('');setCity('');setTitle('');setBody('');setRating(5);setSent(true);setShowForm(false)};
 return <section className="reviews-faq">
  <section className="reviews-section" id="reviews">
   <div className="reviews-heading">
    <div className="reviews-title-block"><span className="eyebrow">03 / THE WORD ON THE SIP</span><h2>Real sips.<br/><i>Big opinions.</i></h2><p>Every flavour has a story. Explore the community notes and leave your own take.</p><div className="review-heading-pills"><span><Sparkles size={14}/> THE GRAVE COMMUNITY</span><span><MessageCircle size={14}/> YOUR VOICE MATTERS</span></div></div>
    <div className="rating-summary"><span className="rating-kicker">COMMUNITY RATING</span><div className="rating-number">{avg}<small>/5</small></div><Stars value={Math.round(Number(avg))} size={20}/><span>{reviews.length} community {reviews.length===1?'note':'notes'}</span><small>Demo reviews are sample content. Real customer reviews can be connected to the backend.</small></div>
   </div>
   <div className="review-grid">{reviews.slice(0,6).map((r,i)=><motion.article className="review-card" key={r.id} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.45,delay:i*.06}}>
    <div className="review-card-top"><Stars value={r.rating}/><span>{r.date}</span></div><Quote className="review-quote-mark" size={29}/><h3>{r.title}</h3><p>“{r.body}”</p><div className="review-author"><span className="review-avatar">{r.name.charAt(0).toUpperCase()}</span><div><b>{r.name}</b><small>{r.city||'GRAVE community'}</small></div><span className="review-author-mark"><ShieldCheck size={14}/> COMMUNITY</span></div>
   </motion.article>)}</div>
   <div className="review-action-row"><div className="review-note"><ShieldCheck size={17}/><span><b>YOUR EXPERIENCE COUNTS</b><small>Share honest feedback and help others find their next favourite sip.</small></span></div><button className="btn btn-dark review-write-btn" onClick={()=>{setShowForm(v=>!v);setSent(false)}}><MessageCircle size={17}/>{showForm?'Close review form':'Write your review'} <ArrowUpRight size={16}/></button></div>
   <AnimatePresence>{showForm&&<motion.form className="review-form" onSubmit={submit} initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.3}}>
    <div className="review-form-heading"><div><span className="eyebrow">YOUR TURN / YOUR WORDS</span><h3>Tell us how it <i>hits.</i></h3><p>Your honest take helps the next person choose their refreshment.</p></div><div className="rating-picker" role="radiogroup" aria-label="Choose a star rating">{[1,2,3,4,5].map(n=><button type="button" key={n} aria-label={`${n} stars`} aria-checked={rating===n} role="radio" onClick={()=>setRating(n)}><Star size={22} fill={n<=rating?'currentColor':'none'}/></button>)}</div></div>
    <div className="review-fields"><label>Your name<input required maxLength="45" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex"/></label><label>City (optional)<input maxLength="45" value={city} onChange={e=>setCity(e.target.value)} placeholder="Your city"/></label><label className="review-field-wide">Review title<input required maxLength="70" value={title} onChange={e=>setTitle(e.target.value)} placeholder="What stood out?"/></label><label className="review-field-wide">Your review<textarea required minLength="8" maxLength="500" rows="4" value={body} onChange={e=>setBody(e.target.value)} placeholder="Tell the community about your experience..."/></label></div>
    <div className="review-submit-row"><small>By submitting, you confirm this is your own feedback.</small><button className="btn btn-dark" type="submit">Submit review <Send size={14}/></button></div>
   </motion.form>}</AnimatePresence>
   {sent&&<p className="review-success" role="status">Thanks for sharing your feedback. Your review is saved in this browser.</p>}
  </section>
  <section className="faq-section" id="faq">
   <div className="faq-intro"><span className="eyebrow">04 / GOOD TO KNOW</span><h2>A few things<br/><i>you might ask.</i></h2><p>Quick answers about the collection, shopping and this GRAVE experience.</p><a className="text-link" href="/contact">Still curious? Contact us <span>↗</span></a></div>
   <div className="faq-list">{faqs.map((f,i)=><div className={`faq-item ${openFaq===i?'faq-open':''}`} key={f.q}><button className="faq-question" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?-1:i)}><span><small>0{i+1}</small>{f.q}</span><ChevronDown size={19}/></button><AnimatePresence initial={false}>{openFaq===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.25}}><p>{f.a}</p></motion.div>}</AnimatePresence></div>)}</div>
  </section>
 </section>
}
