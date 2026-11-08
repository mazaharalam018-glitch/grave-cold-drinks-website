import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Instagram, MessageCircle, Clock, Send, Sparkles, ShieldCheck } from 'lucide-react';

export default function Contact(){
 const [sent,setSent]=useState(false);
 const [form,setForm]=useState({name:'',email:'',subject:'General enquiry',message:''});
 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=e=>{e.preventDefault();setSent(true)};
 return <main className="inner-page contact-page">
  <section className="page-hero contact-hero">
   <span className="eyebrow light">WE’RE ALL EARS / 05</span>
   <h1>Let’s make<br/><i>contact.</i></h1>
   <p>Big idea, product question or just want to say hello? We’re listening. Drop us a note and let’s start a good conversation.</p>
   <div className="contact-hero-stamp"><MessageCircle size={18}/><span>GOOD PEOPLE.<br/>GOOD CONVERSATIONS.</span></div>
  </section>
  <section className="contact-layout section">
   <div className="contact-info">
    <span className="eyebrow">THE HUMAN SIDE OF GRAVE</span>
    <h2>Talk to us.<br/><i>We’re listening.</i></h2>
    <p>For product enquiries, partnerships, press or a little feedback, choose your lane and get in touch.</p>
    <div className="contact-detail-card"><span className="contact-detail-icon"><Mail size={19}/></span><div><small>DROP US AN EMAIL</small><a href="mailto:hello@grave.example">hello@grave.example</a></div><ArrowUpRight size={16}/></div>
    <div className="contact-detail-card"><span className="contact-detail-icon"><MapPin size={19}/></span><div><small>OUR HOME BASE</small><b>India · Everywhere</b></div></div>
    <div className="contact-detail-card"><span className="contact-detail-icon"><Clock size={19}/></span><div><small>WHEN WE’RE AROUND</small><b>Monday – Friday · 10 AM – 6 PM</b></div></div>
    <a className="contact-social-link" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={17}/> Follow the GRAVE story <ArrowUpRight size={15}/></a>
   </div>
   <div className="contact-form-wrap">
    <div className="contact-form-top"><span className="eyebrow">SEND A MESSAGE</span><span className="contact-form-icon"><Sparkles size={20}/></span><h2>What’s on<br/><i>your mind?</i></h2><p>Fill in the details below. We’ll take it from here.</p></div>
    <form className="contact-form" onSubmit={submit}>
     {sent?<div className="success-state"><div><span>✓</span></div><span className="eyebrow">MESSAGE READY</span><h2>Thanks for<br/><i>reaching out.</i></h2><p>This demo form has recorded your submission locally. Connect an email service or Django endpoint to receive real messages.</p><button type="button" className="btn btn-dark" onClick={()=>{setSent(false);setForm({name:'',email:'',subject:'General enquiry',message:''})}}>Send another message <ArrowRight size={16}/></button></div>:<>
      <div className="contact-form-row"><label><span>01 / YOUR NAME</span><input name="name" required value={form.name} onChange={update} placeholder="e.g. Alex Morgan"/></label><label><span>02 / EMAIL ADDRESS</span><input name="email" type="email" required value={form.email} onChange={update} placeholder="you@example.com"/></label></div>
      <label><span>03 / WHAT’S THIS ABOUT?</span><select name="subject" value={form.subject} onChange={update}><option>General enquiry</option><option>Product question</option><option>Partnership</option><option>Press & media</option><option>Feedback</option></select></label>
      <label><span>04 / YOUR MESSAGE</span><textarea name="message" rows="5" required minLength="10" value={form.message} onChange={update} placeholder="Tell us a little more..."/></label>
      <div className="contact-form-bottom"><small><ShieldCheck size={14}/> Your details stay within this demo experience.</small><button className="btn btn-dark" type="submit">Send your message <Send size={16}/></button></div>
     </>}
    </form>
   </div>
  </section>
 </main>
}
