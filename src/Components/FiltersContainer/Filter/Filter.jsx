import react, { Component } from "react";
import styles from "./Filter.module.scss";
import WarningPopup from "../../WarningPopup/WarningPopup";
import { CloseIcon, EditIcon } from "../../svg";
import { Link } from "react-router-dom";

class Filter extends Component {
  state = {
    showPopup: false,
  };
  render() {
    const { name, id,DeleteFilter } = this.props;
    return (
      <div className={styles.container}>
        {this.state.showPopup && (
          <WarningPopup
            accept={DeleteFilter}
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
              pathname: process.env.PUBLIC_URL + "/AddnewFilter",
              state: { type: "Filter", id: id },
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
