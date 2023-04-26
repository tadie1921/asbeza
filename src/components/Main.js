import React, { useEffect } from "react";
import {Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import Order from "./Order";
import Payment from "./Payment";
import { fetchItems } from "../redux/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./checkout";
import AdminApp from "../adminComponent/AdminApp";

export default function Main() {

    const dispatch = useDispatch();
    const itemStatus = useSelector(state => state.items.status);
    
    
    
   /*  useEffect(()=>{
      if(itemStatus === 'idle') {
        dispatch(fetchItems())
      }
    },[itemStatus]) */
  

    return(
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/order' element={<Order />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin/*' element={<AdminApp />}/>
        <Route path="*" element={
            <Navigate to='/home' replace/>
        } />
      </Routes>
    );
}