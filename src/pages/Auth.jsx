import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return <main className="auth-page">
    <div className="auth-visual">
      <div className="auth-visual-shade"/>
      <Link to="/" className="auth-visual-brand">GRAVE<span>®</span><small>COLD DRINKS</small></Link>
      <div className="auth-visual-copy"><span>THE GRAVE CLUB</span><h2>Good taste.<br/><i>Good company.</i></h2><p>Your favourites, your details, all in one place.</p></div>
      <div className="auth-visual-foot"><span>STAY COLD. STAY BOLD.</span><span>01 — THE MEMBERS EDIT</span></div>
    </div>
    <motion.section className="auth-panel" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
      <div className="auth-panel-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="auth-subtitle">{subtitle}</p>{children}{footer}</div>
    </motion.section>
  </main>;
}
function Field({label,icon:Icon,...props}) {
  return <label className="auth-field"><span>{label}</span><div className="auth-input-wrap">{Icon&&<Icon size={17}/>}<input {...props}/></div></label>;
}
export function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate(); const location = useLocation();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [show,setShow]=useState(false); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
  if(isAuthenticated) return <Navigate to="/account" replace/>;
  const submit=async(e)=>{e.preventDefault();setError('');setBusy(true);try{await login({email,password});navigate(location.state?.from || '/account',{replace:true});}catch(err){setError(err.message || 'Unable to sign in.');}finally{setBusy(false);}};
  return <AuthShell eyebrow="WELCOME BACK / 01" title={<>Good to see<br/><i>you again.</i></>} subtitle="Sign in to your GRAVE account and pick up where you left off.">
    <form className="auth-form" onSubmit={submit}>
      <Field label="EMAIL ADDRESS" icon={Mail} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <label className="auth-field"><span>PASSWORD</span><div className="auth-input-wrap"><LockKeyhole size={17}/><input type={show?'text':'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/><button type="button" className="password-toggle" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
      {error&&<p className="auth-error" role="alert">{error}</p>}
      <button className="auth-submit" disabled={busy}>{busy?'SIGNING IN…':'SIGN IN'} <ArrowRight size={17}/></button>
    </form>
    <p className="auth-switch">New to GRAVE? <Link to="/signup">Create an account <ArrowRight size={14}/></Link></p>
    <p className="auth-note"><ShieldCheck size={14}/> Demo profile is stored in this browser. Use a backend for production accounts.</p>
  </AuthShell>;
}
export function Signup() {
  const { signup, isAuthenticated } = useAuth(); const navigate=useNavigate();
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [confirm,setConfirm]=useState('');
  const [show,setShow]=useState(false);const [error,setError]=useState('');const [busy,setBusy]=useState(false);
  if(isAuthenticated) return <Navigate to="/account" replace/>;
  const submit=async(e)=>{e.preventDefault();setError('');if(password!==confirm){setError('Your passwords do not match.');return;}setBusy(true);try{await signup({name,email,password});navigate('/account',{replace:true});}catch(err){setError(err.message||'Unable to create account.');}finally{setBusy(false);}};
  return <AuthShell eyebrow="JOIN THE CLUB / 02" title={<>Make yourself<br/><i>at home.</i></>} subtitle="Create your GRAVE account for a more personal refreshment experience.">
    <form className="auth-form" onSubmit={submit}>
      <Field label="FULL NAME" icon={UserRound} type="text" autoComplete="name" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required minLength={2}/>
      <Field label="EMAIL ADDRESS" icon={Mail} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <label className="auth-field"><span>PASSWORD <small>8+ CHARACTERS</small></span><div className="auth-input-wrap"><LockKeyhole size={17}/><input type={show?'text':'password'} autoComplete="new-password" placeholder="Create a password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/><button type="button" className="password-toggle" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
      <label className="auth-field"><span>CONFIRM PASSWORD</span><div className="auth-input-wrap"><LockKeyhole size={17}/><input type="password" autoComplete="new-password" placeholder="Enter password again" value={confirm} onChange={e=>setConfirm(e.target.value)} required minLength={8}/></div></label>
      {error&&<p className="auth-error" role="alert">{error}</p>}
      <button className="auth-submit" disabled={busy}>{busy?'CREATING ACCOUNT…':'CREATE ACCOUNT'} <ArrowRight size={17}/></button>
    </form>
    <p className="auth-switch">Already a member? <Link to="/login">Sign in <ArrowRight size={14}/></Link></p>
    <p className="auth-note"><ShieldCheck size={14}/> Demo profile is stored in this browser. Use a backend for production accounts.</p>
  </AuthShell>;
}
export function Account() {
  const {user,updateProfile,logout}=useAuth();const navigate=useNavigate();
  const [editing,setEditing]=useState(false);const [name,setName]=useState(user?.name||'');const [phone,setPhone]=useState(user?.phone||'');const [city,setCity]=useState(user?.city||'');const [saved,setSaved]=useState(false);
  if(!user) return <Navigate to="/login" replace/>;
  const initials=user.name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
  const save=(e)=>{e.preventDefault();updateProfile({name:name.trim(),phone:phone.trim(),city:city.trim()});setEditing(false);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  const signout=()=>{logout();navigate('/',{replace:true});};
  return <main className="account-page">
    <section className="account-hero"><div><span className="eyebrow light">THE GRAVE CLUB / YOUR SPACE</span><h1>Your account.<br/><i>Your kind of refreshment.</i></h1><p>Keep your details close and your favourites closer.</p></div><div className="account-hero-mark">G<span>®</span></div></section>
    <section className="account-content">
      <aside className="account-sidebar"><div className="account-avatar">{initials}</div><h2>{user.name}</h2><p>{user.email}</p><span className="member-pill">GRAVE MEMBER</span><button className="account-side-link active"> <UserRound size={16}/> Profile details</button><button className="account-side-link" onClick={signout}> <LockKeyhole size={16}/> Sign out</button></aside>
      <div className="account-main">
        <div className="account-section-head"><div><span className="eyebrow">MEMBER PROFILE / 01</span><h2>Personal details</h2></div>{!editing&&<button className="account-edit" onClick={()=>setEditing(true)}>EDIT DETAILS <ArrowRight size={15}/></button>}</div>
        {saved&&<p className="profile-saved">Your profile has been updated.</p>}
        {editing?<form className="profile-form" onSubmit={save}><label>FULL NAME<input value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></label><label>EMAIL ADDRESS<input value={user.email} readOnly/></label><label>PHONE NUMBER<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91"/></label><label>CITY<input value={city} onChange={e=>setCity(e.target.value)} placeholder="Your city"/></label><div className="profile-form-actions"><button type="button" className="account-cancel" onClick={()=>setEditing(false)}>CANCEL</button><button className="auth-submit">SAVE CHANGES <ArrowRight size={16}/></button></div></form>:<div className="profile-details"><div><span>FULL NAME</span><b>{user.name}</b></div><div><span>EMAIL ADDRESS</span><b>{user.email}</b></div><div><span>PHONE NUMBER</span><b>{user.phone||'Add your phone number'}</b></div><div><span>CITY</span><b>{user.city||'Add your city'}</b></div></div>}
        <div className="account-section-head order-head"><div><span className="eyebrow">YOUR GRAVE ACTIVITY / 02</span><h2>Order history</h2></div></div>
        <div className="empty-orders"><div className="empty-orders-icon">✳</div><h3>No orders just yet.</h3><p>Your next favourite is waiting to be discovered.</p><Link to="/drinks" className="btn btn-dark">Explore the drinks <ArrowRight size={15}/></Link></div>
        <p className="account-member-since">MEMBER SINCE {new Date(user.joinedAt).toLocaleDateString('en-IN',{month:'long',year:'numeric'}).toUpperCase()}</p>
      </div>
    </section>
  </main>;
}
