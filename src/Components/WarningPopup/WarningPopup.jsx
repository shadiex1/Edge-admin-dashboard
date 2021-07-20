import React from "react";
import styles from "./WarningPopup.module.scss";
import Backdrop from "../Backdrop.jsx/Backdrop";

const WarningPopup = (props) => {
  return (
    <div className={styles.WarningPopup}>
      <Backdrop clicked={props.cancel} show={props.show} />
      <div className={styles.warning}>
        <h2>{props.header}</h2>
        <div className={styles.btns}>
          <button onClick={props.accept} className={styles.accept}>
            Accept
          </button>
          <button onClick={props.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
