import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import PaymentOption from "./PaymentOption";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const baseUrl = "http://localhost:3000";

export default function Payment (props) {

    const navigate = useNavigate();
    const location = useLocation();
    const orders = location.state.orders;

    const [paymentOption, setPaymentOption] = useState('');
    const [memberIdStatus, setMemberIdStatus] = useState('');
    const [transactionStatus, setTranactionStatus] = useState('');

    orders.paymentOption = paymentOption;

    const handle_memberIdField = () => {
        const memberId = document.querySelector('#memberId').value;

        /* if(memberId.length == 13 || memberId.length == 0){
            setMemberIdStatus('incorrect')
        } */
        if(memberId.length === 14){
            /* fetch(baseUrl + `/members/${memberId}`)
            .then(response => response.json())
            .then(response => {
                if(response.length){
                    setMemberIdStatus('correct')
                    orders.memberId = memberId; 
                } else {
                    setMemberIdStatus('incorrect')
                }
                })
            .catch(err => console.log(err)) */
            orders.memberId = memberId
            setMemberIdStatus('correct')
        }
    }
    const handle_meberIdFocus = () => {
        /* if(memberIdStatus !== 'correct'){
            setMemberIdStatus('incorrect')
        } */
    }

    const handle_paymentOption = () => {
        if(memberIdStatus !== 'correct'){
            setMemberIdStatus('incorrect')
        }
        if(document.getElementById('cash').checked){
            const value = document.getElementById('cash').value;
            setPaymentOption(value);
        } else if(document.getElementById('online').checked){
            const value = document.getElementById('online').value;
            setPaymentOption(value);
        }        
    }
    const handle_transactionFocus = () => {
        if(transactionStatus !== 'correct'){
            setTranactionStatus('incorrect');
        }
    }
    const handle_transaction = () =>{
        const value = document.querySelector('#transactionNum').value;
        if(value.length === 0 || value.length === 4) {
            setTranactionStatus('incorrect');
        }
        if(value.length > 4) {
            setTranactionStatus('correct');
            orders.transactionNum = value;
        }
    }

    const handle_done = () => {
        if(memberIdStatus !== 'correct'){
            setMemberIdStatus('incorrect')
            return;
        }
        if(paymentOption === 'online' && transactionStatus !== 'correct') {
            setTranactionStatus('incorrect')
            return;
        }
        
        orders.datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(orders); 
        const orderList = [];
        //send the order  //1234-5678-9000
        orders.items.map(item => {
            const order = {...orders, items: item.id, count: item.count} 
            orderList.push(order);          
        });
       
        const myOrderList = JSON.stringify(orderList);
        /* fetch(baseUrl + '/orders', {
            method: "POST",
            body: JSON.stringify({order: myOrderList}),
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        })
        .then(response => {
            console.log(response.json())
            navigate('/checkout')
        })
        .catch(err => console.log(err)) */
       // navigate('/checkout')
       props.sendData("Thank you for chosing birrama")
       props.telegram.close();
    }

    const handle_cancelBtn = () => {
        navigate('/order');
        console.log('hellow')
    }


    return(
        <>
        <div className="row">
            <Header component={'payment'} title={'Checkout & Payment'} 
                        order_num={orders.orderNum}/>
            <div className="cafe-items row" 
                style={{marginTop: '150px'}}>
                <div className="col-6">
                    <p style={{fontSize: 13, lineHeight:1}}>
                        Please enter your 12 Digit
                        Member Id (0000-0000-0000)
                    </p>
                </div>
                <div className="col-5 mt-1 me-1" >
                    <input 
                        id="memberId"
                        onFocus={()=>handle_meberIdFocus()}
                        onChange={()=> handle_memberIdField()}
                        type="text" size={12} maxLength={14}
                        style={{height: 28, fontSize: 16, position: 'relative', top:'-2px', left:'-12px'}}/>
                    <p style={{fontSize:12}}>
                        {memberIdStatus === 'incorrect' &&
                        <span style={{color: 'red'}}>
                          <FontAwesomeIcon icon={faCircleXmark} />&nbsp;
                           Member id is incorrect
                        </span>
                        }
                        {memberIdStatus === 'correct' &&
                        <span style={{color: 'green'}}>
                            <FontAwesomeIcon icon={faCheckCircle} />&nbsp;
                             Member id is correct
                        </span>
                        }   
                    </p> 
                </div>
                <div className="col-12">
                    <p style={{fontSize: 16}}>
                        Your Total fee  &nbsp;
                        <span style={{color: 'blue', textDecoration: 'underline'}}>
                            {Number(location.state.orders.totalPrice).toFixed(2) + ' ETB'}
                        </span>
                    </p>
                </div> 
                <div className="col-12">
                    <form id="payment-option" onChange={()=>handle_paymentOption()}>
                        <span style={{fontSize: 14}}>Choose your payment option below</span>
                        <div className="offset-1">
                            <input type="radio" id="cash" name="payment_option" 
                                value="cash" />&nbsp;
                            <label><span style={{fontSize:14}}>Cash on Delivery</span></label><br/>
                            <input type="radio" id="online" name="payment_option" value="online" />&nbsp;
                            <label><span style={{fontSize:14}}>Online Payment</span></label>
                            </div>
                    </form>                    
                </div>
                {memberIdStatus === 'correct' && paymentOption !== '' 
                        && paymentOption === 'cash' &&
                    <div className="offset-1 mt-2">
                        <div className="mx-5"
                            style={{textAlign: 'center',padding: '10px', margin: '20px',
                                        border: '2px solid black', background:'#badcf1'}}>
                            <p style={{fontSize:14}}>
                                You will be able to pay when you receive
                                your order. Please ensure that there is 
                                someone at the delivery site to make the 
                                payment in cash.
                            </p>
                        </div>
                    </div>
                } 
                {memberIdStatus === 'correct'&& paymentOption !== '' 
                        && paymentOption === 'online' &&
                    (<div className="offset-2 mt-2">
                        <p style={{fontSize: 14}}>We accept payments via</p>
                        
                        <PaymentOption />

                        <div className="row">
                            <div className="col-7">
                                <p style={{fontSize: 14, lineHeight: 1, textAlign: 'center'}}>
                                    Once you complate the payment, please enter your 
                                        transaction # from you payment receipt.                                    
                                </p>
                            </div>
                            <div className="col-4 mt-1 me-1" >
                                <input
                                    id="transactionNum"
                                    onChange={()=>handle_transaction()} 
                                    onFocus={()=> handle_transactionFocus()}
                                    type="text" size={16} 
                                    style={{height: 28, fontSize: 16, position: 'relative', top:'-2px', left:'-12px'}}
                                />
                                {transactionStatus === 'incorrect' &&
                                    <span style={{color: 'red'}}>
                                    <FontAwesomeIcon icon={faCircleXmark} />&nbsp;
                                       Can't be empty
                                    </span>
                                }         
                            </div>
                        </div>
                    </div>)
                }           

            </div>
       </div>
                <Footer  component='payment' btn_name='Done' btn_func={handle_done} 
                    cancel_func={handle_cancelBtn}/> 
       
   </>
    );
    /* 
    
     
    */
}