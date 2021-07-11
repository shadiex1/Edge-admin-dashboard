import React, { Component } from "react";
import styles from "./SingleOrder.module.scss";
import {withRouter} from "react-router-dom";
import logo from "../../assets/logo.png";
import Menu from "../../Components/Menu/Menu"
class SingleOrder extends Component{
  state={
    editPaymentClicked:false,
    paymentStatus:null,
    editShipmentClicked:false,
    shipStatus:null,
    order:null
  }

  componentDidMount(){
  if (this.props.match.params && this.props.match.params.id) {
    //  order=this.props.orders.find(order=> order.id == this.props.match.params.id)
    if (this.props.location.state) {
      this.setState({
        order:this.props.location.state
      })
      // {
      //   console.log(this.props.location.state, "hagtk");
      // }
    }
  } 
  }
  render(){
    // let order=null
    const {order}=this.state
       
      const editShipmentHandler=()=>{
        this.setState({
          editShipmentClicked:true
        })
      }
      const editPaymentHandler=()=>{
        this.setState({
          editPaymentClicked:true
        })
      }
      const setShipStatus=(e)=>{
          // order.shipmentStatus=e.target.value
          // console.log(e.target.value)
          this.setState({
            shipStatus:e.target.value,
            editShipmentClicked:false
          })
      }
      const setPaymentStatus=(e)=>{
          // order.shipmentStatus=e.target.value
          // console.log(e.target.value)
          this.setState({
            paymentStatus:e.target.value,
            editPaymentClicked:false
          })
      }
    return (
      <div className={styles.SingleOrder}>
        <Menu />
        {this.state.order && (
          <div className={styles.receipt}>
            <div className={styles.orderID}>
              <button># {order.ID} </button> <img src={logo} />
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
                    City : <span>{order.shippmentDetails.governorate}</span>
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
                    {this.state.shipStatus && <button>submit</button>}
                  </div>
                </div>
              ) : null}
            </div>
            {/* <div className={styles.payment}>
                <p style={{
                  fontSize:"40px",
                  fontWeight:"bold",
                  margin:"0",
                  color:"black"
                }}>Payment</p>
                <p>Payment Method : <span>{order.paymentMethod}</span></p>
                <p>Payment Status : {this.state.editPaymentClicked ?  <select
        value={order.paymentStatus}
        onChange={e => {
          setPaymentStatus(e)
        }}
      >
        <option value="">{this.state.paymentStatus}</option>
        {this.props.paymentOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select> : <span>{this.state.paymentStatus ? this.state.paymentStatus:order.paymentStatus}</span>}  
                <button onClick={()=>editPaymentHandler()} className={styles.edit}>Edit</button>
                {this.state.paymentStatus && <button>submit</button>}

                </p>
              </div> */}
          </div>
        )}
      </div>
    );
  }
    
}

export default withRouter(SingleOrder) 



