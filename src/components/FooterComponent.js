import React from "react";

export default function Footer(props) {
    return(
        <div className="cafe-status-wrap col-12">
            <div  className="cafe-status shown d-flex justify-content-end">
                {props.component === 'payment' && (
                    <span className="cafe-order-edit mx-3"
                            onClick={props.cancel_func}  >Cancel
                    </span>
                )}                                                 
                <button className="me-3 my-3" onClick={props.btn_func}
                        style={{backgroundColor:'#0891ec'}} >
                    {props.btn_name}
                </button>                                                                    
            </div>
        </div>    
    );
}