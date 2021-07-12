import React, { Component } from "react";
import styles from "./Menu.module.scss";
import Logo from "../../assets/logo.png";
import { Link} from "react-router-dom"
import WarningPopup from "../WarningPopup/WarningPopup";
class Menu extends Component{ 
    state = {
          showPopup: false,
        };
    render(){
       
    return (
      <div className={styles.Menu}>
        <div className={styles.logo}>
          <Link to={process.env.PUBLIC_URL + "/"}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className={styles.Links}>
          <Link to={process.env.PUBLIC_URL + "/Orders"}>
            <li className={styles.Link}>Orders</li>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Products/"}>
            <li className={styles.Link}>Products</li>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Categories/"}>
            <li className={styles.Link}>Categories</li>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Showcase"}>
            <li className={styles.Link}>Showcase</li>
          </Link>
        </ul>
        {/* <div onClick={()=>this.setState({
            showPopup:true
        })} className={styles.publish}>Publish</div> */}
        {this.state.showPopup && <WarningPopup
        accept={()=>this.setState({
            showPopup:false
        })}
          cancel={() =>
            this.setState({
              showPopup: false,
            })
          }
          show
          header="Are you sure you want to submit all changes"
        />}
        
        
      </div>
    );
}
}

export default Menu