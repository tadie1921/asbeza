import React from "react";

export default function Footer(props) {
    return(
        <div className="fixed-bottom d-flex justify-content-end" >
            <div className="my-4">
                {props.component === 'payment' && (
                            <span className="cafe-order-edit my-3 me-5"
                                onClick={props.cancel_func}  >Cancel
                            </span>         
                    )}  
            </div> 
            <div>                                                
                <button className="me-3 my-3" onClick={props.btn_func}
                        style={{backgroundColor:'#0891ec'}} >
                    {props.btn_name}
                </button>                                                                    
            </div>
        </div>    
    );
}