import React from "react";

export default function Checkout() {

    return(

        <div className="row">
            <div className="offset-md-2 col-12 col-md-8" style={{borderBottom: '4px solid #ebedf0'}}>
                <div className="cafe-order-header-wrap row">
                    <h2 className="cafe-order-header col-12">Orders Summery</h2>
                    <div className="offset-1 row">
                        <div className="col-3 col-md-5">
                            <img height={40} width={40} src="img/Burger_148.png"/>    
                        </div>
                        <div className="col-8 col-md-5 mt-1">
                            <p style={{fontSize: 16}}>     
                                <span style={{fontWeight: 'bold'}}>Birrama</span><br/> 
                                <span style={{color:'grey', fontStyle: 'italic', fontSize: 16}}>
                                    Empowering the Consumer
                                </span>
                            </p>
                        </div>
                       
                    </div>
                </div>
        </div>
            <div className="row m-5">
                <p className="col-10">Thank you message in Amharic and the photo of that girl</p>
            </div>
        </div>
    )
}