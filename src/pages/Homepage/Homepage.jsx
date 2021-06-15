import React from "react";
import styles from "./Homepage.module.scss"
import Logo from "../../assets/logo.png"
import { Link} from "react-router-dom"

const Homepage = (props)=>{
    return(
        <div className={styles.homepage}>
            <div className={styles.container}>
                <div className={styles.header}>
                <img src={Logo} alt="logo"/>
                <h1>Admin Dashboard</h1>
            </div>
            <div className={styles.categories}>
            <Link  to={process.env.PUBLIC_URL+"/Orders/"}>
                <button className={styles.btn}>Orders</button>
                </Link>

                <button className={styles.btn}>Products Catalog</button>
                <button className={styles.btn}>Reports</button>
            </div>
            </div>
            
        </div>
    )
}

export default Homepage