import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import {counterChanged} from '../redux/itemSlice';
import Headers from "./HeaderComponent";
import Footer from "./FooterComponent";

var orderCount = 0;

export default function Home(props) {
    
    const [itemsList, setItemsList] = useState([]);
    const [updateCounter, setUpdateCounter] = useState(false);
    
    //redux state 
    const items = useSelector(state => state.items);
    const errMess = useSelector(state => state.items.error);

    if(orderCount > 0) {
        props.telegram.expand();
    }

    useEffect(()=>{
        if(items.status === 'succeeded'){
            setItemsList(items.items)
        } if(updateCounter === true) {
            setItemsList(items.items)
            setUpdateCounter(false);
        }
    },[items.status,items.items, setItemsList, updateCounter, setUpdateCounter])

    //View Order Button
    const navigate = useNavigate();
    const handle_viewOrder = () => {
        navigate('/order')
    }
    
    // increment and decrement button
    const dispatch = useDispatch();
    const handle_incBtn = (id) => {
        itemsList.map(e =>{
            if(e.id === id) {
                dispatch(counterChanged({id: e.id, action: "inc"}))
                setUpdateCounter(true) 
                orderCount += 1;
            }
         })    
    }

    const handle_decBtn = (id) => {
        itemsList.map(e =>{
           if(e.id === id) {
              dispatch(counterChanged({id: e.id, action: "dec"}))
              setUpdateCounter(true) 
              orderCount -= 1;
           }
        }) 
   }
    
    const Itmes = itemsList.map(item => {
        return(
            <div key={item.id} className="cafe-item" >
                {item.counter > 0 && (
                    <div className="cafe-item-counter">{item.counter}</div>
                )}
                <div className="cafe-item-photo">
                    <picture className="cafe-item-lottie ">
                        <source type="application/x-tgsticker" srcSet="./img/tgs/Burger.tgs" />
                        <img src={item.image}
                            style={{'backgroundImage': `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iLTMwMCUiIHgyPSItMjAwJSIgeTE9IjAiIHkyPSIwIj48c3RvcCBvZmZzZXQ9Ii0xMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjMwJSIgc3RvcC1vcGFjaXR5PSIuMDciLz48c3RvcCBvZmZzZXQ9IjcwJSIgc3RvcC1vcGFjaXR5PSIuMDciLz48c3RvcCBvZmZzZXQ9IjExMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MSIgZnJvbT0iLTMwMCUiIHRvPSIxMjAwJSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MiIgZnJvbT0iLTIwMCUiIHRvPSIxMzAwJSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjY4LDQ5OWMtNTEtMi0xMDYtMS0xNTMtMjItMjgtMTItMzktNDAtNDItNjgsMC00LDMtNywxLTEwLTUtNi0xNiwzLTEzLTE0LDItMTEsMTItMTQsMTEtMjcsMC0yLTUtMTItNS0xNiwwLTYsNS0xNyw0LTIyLTItNy05LTUtNi0xNSwzLTEwLDE0LTcsMTktMTMsNy0xMi0xNC0yNC0xNy0zMy0zLTEyLTEtMjgsMi0zOSwyOC0xMDEsMTQ4LTEzMywyMzktMTE1LDY0LDEzLDEzMCw1OSwxNDIsMTI3LDMsMTgsMCwzMi0xNSw0Mi0xLDEtMTEsMTMtNywxNiw0LDIsMjAsNCwyMiw5LDYsMTAtNywxNS05LDIyLTEsMywzLDExLDMsMTYsMCwyLTMsMTctMiwxOSwyLDIsOCwxLDEwLDQsMyw1LDQsMTYsNiwyMiw0LDEzLTE1LDIwLTE5LDI3LTksMjAsNSw0MC0yMyw2MC00MCwyOC0xMDEsMjktMTQ4LDMweiIvPjwvc3ZnPg==')`
                               }}
                            alt={item.name} />
                    </picture>
                </div>
                <div className="cafe-item-label">
                    <span className="cafe-item-title">{item.name}</span>
                    &nbsp;
                    <span className="cafe-item-price">{item.price + ' ETB'}</span>
                </div>
                <div className={item.counter > 0 ? "cafe-item-buttons selected" : "cafe-item-buttons"}>
                    <button className="cafe-item-decr-button button-item ripple-handler"
                            onClick={() => handle_decBtn(item.id)}>
                        <span className="ripple-mask"><span className="ripple"></span></span>
                    </button>
                    <button className="cafe-item-incr-button button-item ripple-handler"
                            onClick={() => handle_incBtn(item.id)}>
                        <span className="button-item-label">Add</span>
                        <span className="ripple-mask"><span className="ripple"></span></span>
                    </button>
                </div>
            </div>    
        )
    });

    //return 
    if(items.status === 'loading') {
        return(
            <Loading />
        )
    } else if(items.status === 'failed') {
        return(
            <div>
                {errMess} <br></br>
                {errMess} <br></br>
                {errMess}
            </div>     
        );
    } else if (items.status === 'succeeded') {
       
        return(
            <div className="row">
                    <Headers component={'Home'} title={'Orders'}/>     
                <div className="cafe-page cafe-items col-12 mb-5"
                    style={{marginTop: '100px'}}> 
                    {Itmes}                             
                </div>
                {orderCount > 0 && ( 
                    <Footer  component={'home'} btn_func={handle_viewOrder} btn_name={'Next'}/>
                )}    
            </div>
                    
        );
    }
}