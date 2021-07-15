import React, { Component } from "react";
import styles from "./Orders.module.scss";
import Order from "../../Components/Order/Order";
import Menu from "../../Components/Menu/Menu";
import OrderFilter from "../../Components/OrderFilter/OrderFilter";
import OrdersTable from "../../Components/OrdersTable/OrdersTable";
import Loading from "../../Components/Loading/Loading"
import {fetchOrders} from "../../Data"
class Orders extends Component{
    state={
        orders:null,
        fetching:true
    }

    componentDidMount(){
        fetchOrders().then((fetchedOrders) =>this.setState({
            orders:fetchedOrders.data,
            fetching:false
        }))
    }
//     fetchProducts(category, 0, 6).then((fetchedProducts) =>
//   this.setState({
//     products: fetchedProducts.data,
//   })
   
    render(){
        return (
          <div className={styles.Orders}>
            <Menu />
            {/* <OrderFilter/> */}
              {this.state.fetching ? <Loading/> : this.state.orders && <OrdersTable orders={this.state.orders} />}
              {console.log(this.state.orders,"ordersss")}

            {/* <Order/> */}
          </div>
        );
    }
    
}

export default Orders