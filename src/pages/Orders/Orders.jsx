import React, { Component } from "react";
import styles from "./Orders.module.scss";
import Order from "../../Components/Order/Order";
import Menu from "../../Components/Menu/Menu";
import OrderFilter from "../../Components/OrderFilter/OrderFilter";
import OrdersTable from "../../Components/OrdersTable/OrdersTable"
class Orders extends Component{
    render(){
        return(
        <div className={styles.Orders}>
            <Menu/>
            {/* <OrderFilter/> */}
            <OrdersTable orders={this.props.orders}/>
            
            hooo hooo hoooo
            {/* <Order/> */}
        </div>
    )
    }
    
}

export default Orders