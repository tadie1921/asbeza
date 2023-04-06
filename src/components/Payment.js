import React from "react";
import { useNavigate } from "react-router-dom";

export default function Payment () {

    const navigate = useNavigate();
    const handle_cancelBtn = () => {
        navigate('/order');
    }

    return(
        <>
        <div className="cafe-page cafe-order-overview">
            <div className="cafe-block">
                <div className="cafe-order-header-wrap">
                    <h2 className="cafe-order-header">Payment Information</h2>
                    <span className="cafe-order-edit"
                          onClick={() => handle_cancelBtn()}  >Cancel
                    </span>
                </div>
            </div>
            <div className="cafe-text-field-wrap">
                <textarea id="commentText" className="cafe-text-field cafe-block" rows="1"
                        placeholder="card …"></textarea>
                <textarea id="commentText" className="cafe-text-field cafe-block" rows="1"
                        placeholder="Phone ..."></textarea>
                <textarea id="commentText" className="cafe-text-field cafe-block" rows="1"
                        placeholder="address ..."></textarea>
	        </div>
       </div>
       <div className="row cafe-status-wrap">
            <div className="cafe-status shown d-flex justify-content-center"
                            style={{backgroundColor: 'skyblue'}}
                            >            
                    <div>
                        <span  className="view-order-button"style={{backgroundColor: 'skyblue'}}>
                            PAY 
                        </span>
                    </div>                                          
            </div>
        </div>
   </>
    );
}