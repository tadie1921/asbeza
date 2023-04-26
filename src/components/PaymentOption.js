import React from "react";

export default function PaymentOption() {
    const Options = (item) => {
        const color = item.color;
        return(
            <div className="row">
                <div className="col-2 ">
                    <img height={40} width={40} src={item.icon}/>    
                </div>
                <div className="col-8 ">
                    <p style={{fontSize: 14}}> 
                        <span>Our account at &nbsp; 
                            <span style={{color: color, textDecoration: 'underline'}}>
                                {item.name} </span> is
                        </span><br/>            
                        <span>12345670</span>
                    </p>
                </div>                                
            </div> 
        );        
    };
    return(
        <>
        <Options name='TeleBirr' color='#0891ec' icon={"img/telebirr.png"}/>
        <Options name='CBE' color='#ddbd56' icon={"img/cbe.jpg"}/>
        </>        
    )
}