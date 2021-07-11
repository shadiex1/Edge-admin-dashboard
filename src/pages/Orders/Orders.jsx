import React, { Component } from "react";
import styles from "./Orders.module.scss";
import Order from "../../Components/Order/Order";
import Menu from "../../Components/Menu/Menu";
import OrderFilter from "../../Components/OrderFilter/OrderFilter";
import OrdersTable from "../../Components/OrdersTable/OrdersTable"
import {fetchOrders} from "../../Data"
class Orders extends Component{
    state={
        orders:null
    }

    componentDidMount(){
        fetchOrders().then((fetchedOrders) =>this.setState({
            orders:fetchedOrders.data
        }))
    }
//     fetchProducts(category, 0, 6).then((fetchedProducts) =>
//   this.setState({
//     products: fetchedProducts.data,
//   })
        componentDidUpdate(){
        console.log(this.state);

        }
    render(){
        return (
          <div className={styles.Orders}>
            <Menu />
            {/* <OrderFilter/> */}
            {this.state.orders && <OrdersTable orders={this.state.orders} />}

            {/* <Order/> */}
          </div>
        );
    }
    
}

export default Orders