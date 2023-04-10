import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment (props) {

    const location = useLocation();

    
    console.log(location.state.orders);

    const [paymentOption, setPaymentOption] = useState('');

    const handle_paymentOption = () => {
        if(document.getElementById('cash').checked){
            const value = document.getElementById('cash').value;
            setPaymentOption(value);
        } else if(document.getElementById('online').checked){
            const value = document.getElementById('online').value;
            setPaymentOption(value);
        }

    }

    const handle_done = () => {
        navigate('/checkout');
    }

    const navigate = useNavigate();
    const handle_cancelBtn = () => {
        navigate('/order');
    }

    return(
        <>
        <div className="cafe-page ">
            <div style={{borderBottom: '4px solid #ebedf0'}}>
                <div className="cafe-order-header-wrap row">
                    <h2 className="cafe-order-header col-12">Checkout & Payment</h2>
                    <div className="offset-1 row">
                        <div className="col-3 col-md-5">
                            <img height={40} width={40} src="img/Burger_148.png"/>    
                        </div>
                        <div className="col-8 col-md-5 mt-1">
                            <p style={{fontSize: 10}}> 
                                <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>Order #1233456543222</span><br/>
                                <span style={{fontWeight: 'bold'}}>Birrama</span><br/> 
                                <span style={{color:'grey', fontStyle: 'italic', fontSize: 9}}>
                                    Empowering the Consumer
                                </span>
                            </p>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="cafe-items row mt-3">
                <div className="col-6">
                    <p style={{fontSize: 14, lineHeight:1}}>
                        Please enter your 12 Digit
                        Member Id (0000-0000-0000)
                    </p>
                </div>
                <div className="col-5 mt-1 me-1" >
                    <input type="text" size={16} 
                        style={{height: 22, fontSize: 16, position: 'relative', top:'-2px', left:'-12px'}}/>
                    <p style={{fontSize:5}}>
                        <span style={{color: 'green'}}>Member id is Correct</span>
                    </p> 
                </div>
                <div className="col-12">
                    <p style={{fontSize: 16}}>
                        Your Total fee  &nbsp;
                        <span style={{color: 'blue', textDecoration: 'underline'}}>
                            {Number(location.state.orders.totalPrice).toFixed(2)}
                        </span>
                    </p>
                </div> 
                <div className="col-12">
                    <form id="payment-option" onChange={()=>handle_paymentOption()}>
                        <span style={{fontSize: 14}}>Choose your payment option below</span>
                        <div className="offset-1">
                            <input type="radio" id="cash" name="payment_option" value="cash"/>&nbsp;
                            <label><span style={{fontSize:14}}>Cash on Delivery</span></label><br/>
                            <input type="radio" id="online" name="payment_option" value="online" />&nbsp;
                            <label><span style={{fontSize:14}}>Online Payment</span></label>
                            </div>
                    </form>                    
                </div>
                {paymentOption !== '' && paymentOption === 'cash' &&
                    (<div className="offset-1 mt-2">
                        <div 
                            style={{textAlign: 'center',padding: '10px', margin: '20px',
                                        border: '2px solid black', background:'#badcf1'}}>
                            <p style={{fontSize:14}}>
                                You will be able to pay when you receive
                                your order. Please ensure that there is 
                                someone at the delivery site to make the 
                                payment in cash.
                            </p>
                        </div>
                    </div>)
                } 
                {paymentOption !== '' && paymentOption === 'online' &&
                    (<div className="offset-2 mt-2">
                        <p style={{fontSize: 14}}>We accept payments via</p>
                        <div className="row">
                            <div className="col-2 ">
                                <img height={40} width={40} src="img/Burger_148.png"/>    
                            </div>
                            <div className="col-8 ">
                                <p style={{fontSize: 14}}> 
                                    <span>Our account at &nbsp; 
                                        <span style={{color: '#0891ec', textDecoration: 'underline'}}>
                                            TeleBirr </span> is
                                    </span><br/>            
                                    <span>12345670</span>
                                </p>
                            </div>                                
                        </div>
                        <div className="row">
                            <div className="col-2 ">
                                    <img height={40} width={40} src="img/Burger_148.png"/>    
                                </div>
                                <div className="col-8 ">
                                    <p style={{fontSize: 14}}> 
                                        <span>Our account at &nbsp; 
                                            <span style={{color: '#ddbd56', textDecoration: 'underline'}}>
                                                CBE </span> is
                                        </span><br/>            
                                        <span>12345670</span>
                                    </p>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <p style={{fontSize: 14, lineHeight: 1, textAlign: 'center'}}>
                                    Once you complate the payment, please enter your 
                                        transaction # from you payment receipt.                                    
                                </p>
                            </div>
                            <div className="col-4 mt-1 me-1" >
                                <input type="text" size={16} 
                                    style={{height: 22, fontSize: 12, position: 'relative', top:'-2px', left:'-12px'}}/>         
                            </div>
                        </div>

                    </div>)
                }           

            </div>
       </div>
       <div className="row cafe-status-wrap">
            <div  className="cafe-status shown d-flex justify-content-end">
                <span className="cafe-order-edit mx-3"
                        onClick={() => handle_cancelBtn()}  >Cancel
                </span>                                 
                <button className="me-3 my-3" onClick={()=>handle_done()}
                        style={{backgroundColor:'#0891ec'}} >
                    Done
                </button>                                                                    
            </div>
        </div>   
   </>
    );
    /* 
    
     
    */
}