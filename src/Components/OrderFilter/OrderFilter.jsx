import React from "react";
import styles from "./OrderFilter.module.scss";

const OrderFilter=(props)=>{
    return(
        <div className={styles.OrderFilter}>
            <div className={styles.Filters}>
                <button>All</button>
                <button>ready for shipping</button>
                <button>pay by credit card</button>
            </div>
        </div>
    )
}

export default OrderFilter