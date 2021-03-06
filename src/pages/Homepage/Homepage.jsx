import React from "react";
import styles from "./Homepage.module.scss";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Homepage = (props) => {
  return (
    <div className={styles.homepage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Logo} alt="logo" />
          <h1>Admin Dashboard</h1>
        </div>
        <div className={styles.categories}>
          <Link to={process.env.PUBLIC_URL + "/Orders/"}>
            <button className={styles.btn}>Orders</button>
          </Link>

          <Link to={process.env.PUBLIC_URL + "/Products/"}>
            <button className={styles.btn}>Products </button>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Categories/"}>
            <button className={styles.btn}>Categories</button>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Showcase/"}>
            <button className={styles.btn}>Showcase</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
