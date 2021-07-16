import React, { Component } from "react";
import styles from "./Filter.module.scss";
import WarningPopup from "../../WarningPopup/WarningPopup";
import { deleteFilter } from "../../../Data";
import { CloseIcon, EditIcon } from "../../svg";
import { Link } from "react-router-dom";

class Filter extends Component {
  state = {
    showPopup: false,
  };
  render() {
    const { name, id } = this.props;
    const { showPopup } = this.state;
    return (
      <div className={styles.container}>
        {showPopup && (
          <WarningPopup
            accept={() =>
              deleteFilter(id) && this.setState({ showPopup: false })
            }
            cancel={() =>
              this.setState({
                showPopup: false,
              })
            }
            show
            header="Are you sure you want to delete this filter"
          />
        )}
        <div className={styles.icons}>
          <Link
            to={{
              pathname: process.env.PUBLIC_URL + `/Edit/Filter/${id}`,
            }}
          >
            <span className={styles.editIcon}>
              <EditIcon />
            </span>
          </Link>
          <span
            onClick={() =>
              this.setState({
                showPopup: true,
              })
            }
            className={styles.closeIcon}
          >
            <CloseIcon />
          </span>
        </div>

        <div className={styles.Filter}>{name}</div>
      </div>
    );
  }
}

export default Filter;
