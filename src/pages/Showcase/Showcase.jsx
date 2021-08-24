import React, { Component } from "react";
import styles from "./Showcase.module.scss";
import Menu from "../../Components/Menu/Menu";
import EditSliderImgs from "../../Components/EditSliderImgs/EditSliderImgs";
import EditNewProducts from "../../Components/EditNewProducts/EditNewProducts";
import Loading from "../../Components/Loading/Loading";
import {ip} from "../../Data"
import { withRouter } from "react-router-dom";

import { fetchNewProducts } from "../../Data";
import axios from "axios";
class Showcase extends Component {
  state = {
    imgs: [],
    showSlider: false,
    showNewProducts: true,
    newProducts: null,
    productsIDs: [],
    currentImgs: [],
    fetching: true,
  };

  componentDidMount() {
    fetchNewProducts().then((fetchedData) =>
      this.setState(
        {
          imgs: fetchedData.data.slides,
          newProducts: fetchedData.data.newProducts,
          fetching: false,
        },
        () => this.pushNewProductsIDs()
      )
    );
  }

  pushNewProductsIDs = () => {
    const productsIDs = [];
    this.state.newProducts.forEach((product) =>
      productsIDs.push(product.productID)
    );
    this.setState({ productsIDs });
  };
  uploadImg = (img) => {
    const formData = new FormData();
    formData.append("sampleFile", img, img.name);
    axios.post(`${ip}/admin/mobile/upload`, formData);
  };
  submitImgsHandler = (imgs) => {
    const namesArr = [];
    imgs.forEach((item) => namesArr.push(item.name));

    imgs.forEach((item) => this.uploadImg(item));
    this.pushNewProductsIDs();

    this.setState({
      imgs: namesArr,
    });

    axios({
      method: "post",
      url: `${ip}/admin/mobile/Home/upd`,
      headers: {},
      data: {
        newProducts: this.state.productsIDs,

        slides: namesArr,
      },
    }).then((response) => {
      //handle success
      if (response.data.status.engError) {
        alert(response.data.status.engError);
      } else {
        alert("Showcase updated successfully");
      }
    });
  };
  submitNewProducts = (IDS) => {
    axios({
      method: "post",
      url: `${ip}/admin/mobile/Home/upd`,
      headers: {},
      data: {
        newProducts: IDS,
        slides: this.state.imgs,
      },
    }).then((response) => {
      //handle success
      if (response.data.status.engError) {
        alert(response.data.status.engError);
      } else {
        alert("Showcase updated successfully");
      }
    });
    this.props.history.push(`${process.env.PUBLIC_URL}/Showcase`);
  };
  showSliderHandler = () => {
    this.setState({
      showSlider: true,
      showNewProducts: false,
    });
  };
  showNewProductsHandler = () => {
    this.setState({
      showNewProducts: true,
      showSlider: false,
    });
  };

  render() {
    return (
      <div className={styles.Showcase}>
        <Menu />
        <div className={styles.banner}>                <h1>Showcase</h1>
</div>
        <div className={styles.OrderFilter}>
          <button
            style={
              this.state.showNewProducts
                ? { backgroundColor: "#d5293f", color: "#fff" }
                : null
            }
            onClick={() => this.showNewProductsHandler()}
          >
            New Products
          </button>

          <button
            style={
              this.state.showSlider
                ? { backgroundColor: "#d5293f", color: "#fff" }
                : null
            }
            onClick={() => this.showSliderHandler()}
          >
            Slider Images
          </button>
        </div>
        {this.state.fetching ? (
          <Loading />
        ) : (
          <div>
            {this.state.newProducts && this.state.showNewProducts && (
              <EditNewProducts
                AddNewProducts={(id) => this.submitNewProducts(id)}
                DeleteProduct={(id) => this.props.DeleteNewProduct(id)}
                newProducts={this.state.newProducts}
                submit={(IDS) => this.submitNewProducts(IDS)}
              />
            )}

            {this.state.showSlider && (
              <EditSliderImgs
                changeSliderImgs={(imgs) => this.submitImgsHandler(imgs)}
                imgs={this.state.imgs}
              />
            ) }
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Showcase);
