import React, { Component } from "react";
import styles from "./Product.module.scss";
import WarningPopup from "../WarningPopup/WarningPopup";
import { CloseIcon, EditIcon } from "../../Components/svg";
import { fetchFilter } from "../../Data";
import { Link, withRouter } from "react-router-dom";

class Product extends Component {
  state = {
    showPopup: false,
    category: "",
    filter: "",
  };
  componentDidMount() {
    if (this.props.category === 1) {
      this.setState({
        category: "Men",
      });
    } else if (this.props.category === 2) {
      this.setState({
        category: "Women",
      });
    } else if (this.props.category === 3) {
      this.setState({
        category: "Kids",
      });
    }

    fetchFilter(this.props.filter).then((filter) =>
      this.setState({
        filter: filter.data.engName,
      })
    );
  }

  DeleteProduct = () => { 
    this.setState({
      showPopup: false,
    });
    this.props.DeleteProduct();
    console.log("ra66")
   
  };
  render() {
    const { code, editable, deletable, img, englishName, arabicName, price } =
      this.props;
    const { showPopup, category, filter } = this.state;
    return (
      <div className={styles.Product}>
        {showPopup && (
          <WarningPopup
            accept={() => this.DeleteProduct()}
            cancel={() =>
              this.setState({
                showPopup: false,
              })
            }
            show
            header="Are you sure you want to delete this product"
          />
        )}
        <div className={styles.icons}>
          {editable && (
            <Link
              to={{
                pathname: process.env.PUBLIC_URL + `/Edit/Product/${code}`,
              }}
            >
              {" "}
              <span className={styles.editIcon}>
                <EditIcon />
              </span>
            </Link>
          )}
          {deletable && (
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
          )}
        </div>

        <div className={styles.img}>
          <img src={`http://18.221.156.111:3001/${img}`} alt=""/>
        </div>

        <div className={styles.details}>
          <p>
            Product Code : <span>{code}</span>
          </p>
          <div className={styles.group}>
            <p>
              English Name : <span>{englishName}</span>
            </p>
            <p>
              Arabic Name : <span>{arabicName}</span>
            </p>
          </div>

          <p>
            Price : <span>{price}</span>
          </p>
          <div className={styles.group}>
            <p>
              Category : <span>{category}</span>
            </p>
            <p>
              Filter : <span>{filter}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
