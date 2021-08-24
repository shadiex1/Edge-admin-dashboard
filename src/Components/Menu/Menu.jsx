import React, { Component } from "react";
import styles from "./Menu.module.scss";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import MenuSidebar from "../MenuSidebar/MenuSidebar";
class Menu extends Component {
  state={
    showMenuSidebar:false
  }
  showMenuSidebarToggleHandler=()=>{
    this.setState((prevState)=>{
      return({showMenuSidebar:!prevState.showMenuSidebar})
    })
  }
  showMenuSidebarClosedHandler=()=>{
    this.setState({
      showMenuSidebar:false
    })
  }

render(){
  const {showMenuSidebar}=this.state
    return (
      <React.Fragment>
        <MenuSidebar open={showMenuSidebar} closed={this.showMenuSidebarClosedHandler}></MenuSidebar>
      <div className={styles.Menu}>
        <div onClick={this.showMenuSidebarToggleHandler} className={styles.toggler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.logo}>
          <Link to={process.env.PUBLIC_URL + "/"}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className={styles.Links}>
          <div className={styles.linkContainer}>
          <Link to={process.env.PUBLIC_URL + "/Orders"}>
            <li className={styles.Link}>Orders</li>
          </Link>
          </div>
          <div className={styles.linkContainer}>

          <Link to={process.env.PUBLIC_URL + "/Products/"}>
            <li className={styles.Link}>Products</li>
          </Link>
          </div>

          <div className={styles.linkContainer}>

          <Link to={process.env.PUBLIC_URL + "/Categories/"}>
            <li className={styles.Link}>Categories</li>
          </Link>
          </div>

          <div className={styles.linkContainer}>

          <Link to={process.env.PUBLIC_URL + "/Showcase"}>
            <li className={styles.Link}>Showcase</li>
          </Link>
          </div>

        </ul>
      </div>
      </React.Fragment>

    );
}
  }


export default Menu;
