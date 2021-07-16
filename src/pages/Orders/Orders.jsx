import React, { Component } from "react";
import styles from "./Orders.module.scss";
import Menu from "../../Components/Menu/Menu";
import OrdersTable from "../../Components/OrdersTable/OrdersTable";
import Loading from "../../Components/Loading/Loading";
import { fetchOrders } from "../../Data";
class Orders extends Component {
  state = {
    orders: null,
    fetching: true,
  };

  componentDidMount() {
    fetchOrders().then((fetchedOrders) =>
      this.setState({
        orders: fetchedOrders.data,
        fetching: false,
      })
    );
  }

  render() {
    return (
      <div className={styles.Orders}>
        <Menu />
        {this.state.fetching ? (
          <Loading />
        ) : (
          this.state.orders && <OrdersTable orders={this.state.orders} />
        )}
      </div>
    );
  }
}

export default Orders;
