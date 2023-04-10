import React, { useState } from "react";
import Header from "./HeaderComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCounter } from "../redux/itemSlice";
import Footer from "./FooterComponent";

export default function Checkout() {

    const items = useState();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handle_finish = () =>{
        //set redux state to normal from server
        //temp
        dispatch(resetCounter());
        navigate('/home');
    }

    return(

        <div className="row">
            <div className="offset-md-2 col-12 col-md-8" style={{borderBottom: '4px solid #ebedf0'}}>
                <Header component={'checkout'} title={'Checkout'}/>                
            </div>
            
                <div className="row mt-4">
                    
                    <div className="col-12 d-flex justify-content-center">
                        <h4 style={{color: 'orange'}}>Thank you for choosing Birrama.</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <div className=" mx-4"
                            style={{textAlign: 'center',padding: '10px', margin: '20px' }}>
                            <h6 style={{fontSize:18, fontFamily: 'serif'}}>
                                Our shop will be available for ordering on Monday, Wednesday, 
                                and Friday. Feel free to comback on this days for ordering.
                            </h6>
                        </div>
                    </div>                
                </div>
            
            <div className="d-flex justify-content-center">
                <img src="img/Burger_148.png"/>
            </div>
            <Footer component={'checkout'} btn_name="Finish" btn_func={handle_finish}/>  
        </div>
    )
}