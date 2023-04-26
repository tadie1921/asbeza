import React from "react";

export default function Header(props) {
    return(
        <div className="offset-md-2 col-12 col-md-8" style={{borderBottom: '4px solid #ebedf0'}}>
            <div className="cafe-order-header-wrap row">
                <h2 className="cafe-order-header col-12" style={{fontSize: 16}}>
                    {props.title}
                </h2>
                <div className="offset-1 row">
                    <div className="col-3 col-md-5">
                        <img height={40} width={40} src="img/balesuk.jpg"/>    
                    </div>
                    <div className="col-8 col-md-5 mt-1">
                        <p style={{fontSize: 16}}> 
                            {props.component === 'payment' &&(<> 
                                <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>
                                Order #{props.order_num}</span><br/></>)}
                            <span style={{fontWeight: 'bold'}}>Birrama</span><br/> 
                            <span style={{color:'grey', fontStyle: 'italic', fontSize: 14}}>
                                Empowering the Consumer
                            </span>
                        </p>
                    </div>
                    
                </div>
            </div>
            </div>
    );
}