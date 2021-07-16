import React, { Component } from "react";
import styles from "./EditNewProducts.module.scss";
import Product from "../Product/Product";
import { fetchProduct } from "../../Data";

class EditNewProducts extends Component {
  state = {
    newProducts: this.props.newProducts,
    searchInput: "",
    showSubmit: false,
  };

  createProductsFromIds = (id) => {
    let newProducts = [...this.state.newProducts];
    fetchProduct(id)
      .then((product) =>
        product.status.engError
          ? alert(product.status.engError)
          : newProducts.push(product.data)
      )
      .then(() => {
        this.setState({ newProducts, showSubmit: true, searchInput: "" });
      });
  };

  searchInputChangeHandler = (event) => {
    this.setState({ searchInput: event.target.value });
  };
  submitProducts = () => {
    const products = [...this.state.newProducts];
    const productsIDS = [];
    products.forEach((product) => {
      productsIDS.push(product.productID);
    });
    this.props.submit(productsIDS);
    this.setState({
      showSubmit: false,
    });
  };
  deleteProduct = (product) => {
    const products = [...this.state.newProducts];
    const index = products.indexOf(product);
    if (index > -1) {
      products.splice(index, 1);
    }
    this.setState({
      newProducts: products,
    });
  };
  render() {
    const { newProducts, showSubmit,searchInput } = this.state;
    return (
      <React.Fragment>
        <p className={styles.header}>Showcase New Products</p>

        <div className={styles.newProducts}>
          {newProducts ? (
            <div className={styles.products}>
              {newProducts.map((product) => (
                <Product
                  deletable
                  DeleteProduct={() => this.deleteProduct(product)}
                  code={product.productID}
                  img={product.imageURL}
                  englishName={product.engName}
                  arabicName={product.araName}
                  price={product.price}
                  category={product.categoryID}
                  key={product.productID}
                  filter={product.filterID}
                />
              ))}
            </div>
          ) : (
            <div>No Products Availble</div>
          )}

          <div className={styles.add}>
            <input
              onChange={(e) => this.searchInputChangeHandler(e)}
              placeholder="Product ID"
              type="text"
            />
            <button
              onClick={() => this.createProductsFromIds(searchInput)}
            >
              ADD
            </button>
            {showSubmit && (
              <button
                onClick={() => this.submitProducts()}
                className={styles.submit}
              >
                SUBMIT
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditNewProducts;
