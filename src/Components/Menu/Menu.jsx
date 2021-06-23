import React from "react";
import styles from "./Menu.module.scss";
import Logo from "../../assets/logo.png";
import { Link} from "react-router-dom"

const Menu = (props)=>{
    return(
        <div className={styles.Menu}>
            
            <div className={styles.logo}>
            <Link  to={process.env.PUBLIC_URL+"/"}>
            <img src={Logo} alt="logo"/>
                </Link>
            </div>
            <ul className={styles.Links}>
            <Link  to={process.env.PUBLIC_URL+"/Orders"}>
                <li className={styles.Link}>Orders</li>
                </Link>
                <Link  to={process.env.PUBLIC_URL+"/Products/"}>

                <li className={styles.Link}>Products</li>
                </Link>
                <Link  to={process.env.PUBLIC_URL+"/Categories/"}>

                <li className={styles.Link}>Categories</li>
                </Link>
                <Link  to={process.env.PUBLIC_URL+"/Showcase"}>
                <li className={styles.Link}>Showcase</li>
                </Link>
            </ul>
        </div>
    )
}

export default Menu