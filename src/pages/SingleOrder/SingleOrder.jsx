import React, { Component } from "react";
import styles from "./SingleOrder.module.scss";
import { withRouter } from "react-router-dom";
import logo from "../../assets/logo.png";
import { fetchOrder } from "../../Data";
import Menu from "../../Components/Menu/Menu";
import axios from "axios";
class SingleOrder extends Component {
  state = {
    editShipmentClicked: false,
    shipStatus: null,
    order: null,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      fetchOrder(this.props.match.params.id).then((res) =>
        this.setState({
          order: res.data,
        })
      );
    }
  }
  editShipmentState = (id, state) => {
    axios({
      method: "post",
      url: "http://18.221.156.111:3001/admin/order/state/upd",
      headers: {},
      data: {
        ID: id,
        shippmentState: state,
      },
    }).then(function (response) {
      //handle success
      if (response.data.status.engError) {
        alert(response.data.status.engError);
      } else alert("shippment status updated successfully");
    });
  };
  render() {
    const { order } = this.state;

    const editShipmentHandler = () => {
      this.setState({
        editShipmentClicked: true,
      });
    };

    const setShipStatus = (e) => {
      this.setState({
        shipStatus: e.target.value,
        editShipmentClicked: false,
      });
    };

    return (
      <div className={styles.SingleOrder}>
        <Menu />
        {this.state.order && (
          <div className={styles.receipt}>
            <div className={styles.orderID}>
              <button># {order.ID} </button> <img src={logo} alt="logo" />
            </div>

            <div className={styles.products}>
              <p>Products</p>
              <div className={styles.ProductsContainer}>
                <ul className={styles.header}>
                  <li>P.code</li>
                  <li>English name</li>
                  <li>Arabic name</li>
                  <li>Quantity</li>
                  <li>Washings</li>
                  <li>Measure</li>
                  <li>Price</li>
                </ul>
                {order.productsDetails
                  ? order.productsDetails.map((product) => (
                      <ul className={styles.product}>
                        <li>{product.productID}</li>
                        <li>{product.engName}</li>
                        <li>{product.araName}</li>
                        <li>{product.quantity}</li>
                        <li>{product.washings}</li>
                        <li>{product.size}</li>
                        <li>{product.price}</li>
                      </ul>
                    ))
                  : null}
              </div>
            </div>
            <div className={styles.shipment}>
              <div className={styles.shippingAddress}>Shipping Address</div>

              {order.shippmentDetails ? (
                <div className={styles.shipmentDetails}>
                  <div className={styles.group}>
                    <div className={styles.detail}>
                      First Name :{" "}
                      <span>{order.shippmentDetails.firstName}</span>
                    </div>
                    <div className={styles.detail}>
                      Last Name :{" "}
                      <span>{order.shippmentDetails.familyName}</span>
                    </div>
                  </div>
                  <div className={styles.detail}>
                    Email: <span>{order.shippmentDetails.email}</span>
                  </div>
                  <div className={styles.detail}>
                    Tel : <span>{order.shippmentDetails.mobileNo}</span>
                  </div>
                  <div className={styles.detail}>
                    City : <span>{order.governorate}</span>
                    {console.log(order)}
                  </div>
                  <div className={styles.detail}>
                    Address : <span>{order.shippmentDetails.address}</span>
                  </div>
                  <div className={styles.group}>
                    {" "}
                    <div className={styles.detail}>
                      Shipment Status :
                      {this.state.editShipmentClicked ? (
                        <select
                          value={order.shipmentStatus}
                          onChange={(e) => {
                            setShipStatus(e);
                          }}
                        >
                          <option value="">{this.state.shipStatus}</option>
                          {this.props.shipmentOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>
                          {this.state.shipStatus
                            ? this.state.shipStatus
                            : order.shippmentState}
                        </span>
                      )}{" "}
                    </div>
                    <button
                      onClick={() => editShipmentHandler()}
                      className={styles.edit}
                    >
                      Edit
                    </button>
                    {this.state.shipStatus && (
                      <button
                        onClick={() =>
                          this.editShipmentState(
                            order.ID,
                            this.state.shipStatus
                          )
                        }
                      >
                        submit
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}{" "}
        <div className={styles.back}>
          <button onClick={() => this.props.history.goBack()}>Back</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleOrder);
