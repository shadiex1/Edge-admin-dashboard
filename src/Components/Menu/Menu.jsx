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
                <li className={styles.Link}>Products Catalog</li>
                <li className={styles.Link}>Reports</li>
            </ul>
        </div>
    )
}

export default Menu