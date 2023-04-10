import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Order() {
    
    var totalPrice = 0.0;
    const orders = {items:[], comment: '', totalPrice: ''};

    const items = useSelector(state => state.items.items);

    const navigate = useNavigate();
    const handle_editBtn = () => {
        navigate('/home');
    }

    const handle_payBtn = () => {
        const comment =  document.querySelector('#commentText').value;
        orders.comment = comment;
        orders.totalPrice = totalPrice;
        console.log(orders)
        navigate('/payment',{state: {orders: orders}});
    }

    const itemsList = items.map(item => {
        if(item.counter > 0) {
            // total price calc
           const price = item.counter * item.price;
           totalPrice += price;
           //add to order 
           const order = {id: item.id, name: item.name, count: item.counter};
           orders.items.push(order) 
        return(
            <div key={item.id} className="cafe-order-item selected">
				<div className="cafe-order-item-photo">
					<picture className="cafe-item-lottie" >
						{/*<source type="application/x-tgsticker" srcSet="./img/tgs/Burger.tgs"/> */}
						<img src={item.image}
                            style={{'backgroundImage': `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iLTMwMCUiIHgyPSItMjAwJSIgeTE9IjAiIHkyPSIwIj48c3RvcCBvZmZzZXQ9Ii0xMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjMwJSIgc3RvcC1vcGFjaXR5PSIuMDciLz48c3RvcCBvZmZzZXQ9IjcwJSIgc3RvcC1vcGFjaXR5PSIuMDciLz48c3RvcCBvZmZzZXQ9IjExMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MSIgZnJvbT0iLTMwMCUiIHRvPSIxMjAwJSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MiIgZnJvbT0iLTIwMCUiIHRvPSIxMzAwJSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjY4LDQ5OWMtNTEtMi0xMDYtMS0xNTMtMjItMjgtMTItMzktNDAtNDItNjgsMC00LDMtNywxLTEwLTUtNi0xNiwzLTEzLTE0LDItMTEsMTItMTQsMTEtMjcsMC0yLTUtMTItNS0xNiwwLTYsNS0xNyw0LTIyLTItNy05LTUtNi0xNSwzLTEwLDE0LTcsMTktMTMsNy0xMi0xNC0yNC0xNy0zMy0zLTEyLTEtMjgsMi0zOSwyOC0xMDEsMTQ4LTEzMywyMzktMTE1LDY0LDEzLDEzMCw1OSwxNDIsMTI3LDMsMTgsMCwzMi0xNSw0Mi0xLDEtMTEsMTMtNywxNiw0LDIsMjAsNCwyMiw5LDYsMTAtNywxNS05LDIyLTEsMywzLDExLDMsMTYsMCwyLTMsMTctMiwxOSwyLDIsOCwxLDEwLDQsMyw1LDQsMTYsNiwyMiw0LDEzLTE1LDIwLTE5LDI3LTksMjAsNSw0MC0yMyw2MC00MCwyOC0xMDEsMjktMTQ4LDMweiIvPjwvc3ZnPg==')`
                              }}
						    alt={item.name}/>
					</picture>
				</div>
				<div className="cafe-order-item-label">
					<div className="cafe-order-item-title">{item.name} <span className="cafe-order-item-counter">
                        <span>{item.counter}</span>x</span></div>
					<div className="cafe-order-item-description">{item.description}</div>
				</div>
				<div className="cafe-order-item-price">{'$' + item.price}</div>
			</div>
        )
        }  
    });

    return(
       <div className="row">
        <div style={{borderBottom: '4px solid #ebedf0'}}>
                    <div className="cafe-order-header-wrap row">
                        <h2 className="cafe-order-header col-12">Orders Summery</h2>
                        <div className="offset-1 row">
                            <div className="col-3 col-md-5">
                                <img height={40} width={40} src="img/Burger_148.png"/>    
                            </div>
                            <div className="col-8 col-md-5 mt-1">
                                <p style={{fontSize: 10}}>     
                                    <span style={{fontWeight: 'bold'}}>Birrama</span><br/> 
                                    <span style={{color:'grey', fontStyle: 'italic', fontSize: 9}}>
                                        Empowering the Consumer
                                    </span>
                                </p>
                            </div>
                        
                        </div>
                    </div>
            </div>
        <div className="cafe-page cafe-order-overview">
                <div className="cafe-block">
                    <div className="cafe-order-header-wrap">
                        <h2 className="cafe-order-header">Your Order</h2>
                        <span className="cafe-order-edit"
                            onClick={() =>handle_editBtn()}  >Edit
                        </span>
                    </div>
                    <div className="cafe-order-items">
                        {itemsList}
                    </div>
                </div>
                <div className="cafe-text-field-wrap">
                    <textarea id="commentText" className="cafe-text-field cafe-block" rows="1"
                            placeholder="Add comment…"></textarea>
                    <div className="cafe-text-field-hint">
                        Any special requests, details, final wishes etc.
                    </div>
                </div>
        </div>
        <div className="offset-1 my-3">
            <p style={{fontSize: 18}}>Total Fee &nbsp;
            <span style={{color: '#0891ec', textDecoration: 'underline'}}>
                {totalPrice.toFixed(2)}
                </span></p>
        </div>
        <div className="cafe-status-wrap">
                <div  className="cafe-status shown d-flex justify-content-end">                                 
                    <button className="me-3" onClick={handle_payBtn} 
                            style={{backgroundColor:'#0891ec'}} >
                        Next
                    </button>                                                                    
                </div>
            </div>   
        </div>
    );
}