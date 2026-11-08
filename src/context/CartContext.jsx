import { createContext, useContext, useMemo, useState } from 'react';
const CartContext = createContext(null);
export function CartProvider({children}) {
 const [items,setItems] = useState([]);
 const add = product => setItems(old => { const found=old.find(x=>x.id===product.id); return found ? old.map(x=>x.id===product.id?{...x,qty:x.qty+1}:x) : [...old,{...product,qty:1}]; });
 const change = (id,delta) => setItems(old=>old.map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0));
 const count=items.reduce((s,x)=>s+x.qty,0), total=items.reduce((s,x)=>s+x.qty*x.price,0);
 const value=useMemo(()=>({items,add,change,count,total}),[items,count,total]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart=()=>useContext(CartContext);
