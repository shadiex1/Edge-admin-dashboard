import React, { Component } from "react";
import styles from "./EditNewProducts.module.scss";
import Product from "../Product/Product";
import {fetchProduct} from "../../Data"

class EditNewProducts extends Component {
  state = {
    newProducts: [],
    searchInput: "",
  };
  
  componentDidMount() {
    this.setState({
      newProducts: this.props.newProducts,
    });
  }
 

  createProductsFromIds = (id) => {
    let newProducts = [...this.state.newProducts];
    fetchProduct(id)
      .then((product) => newProducts.push(product.data))
      .then((response) => {
        console.log(response);
        this.setState({ newProducts });
      });

  };
 
  searchInputChangeHandler = (event) => {
    this.setState({ searchInput: event.target.value });
  };
  submitProducts =()=>{
      const products = [...this.state.newProducts]
      const productsIDS=[]
        products.forEach(product=>{
            productsIDS.push(product.productID)
        })
        this.props.submit(productsIDS)
  }
  deleteProduct=(product)=>{
    //   const array = [2, 5, 9];

    //   console.log(array);
const products=[...this.state.newProducts]
      const index = products.indexOf(product);
      if (index > -1) {
        products.splice(index, 1);
      }

      // array = [2, 9]
      this.setState({
          newProducts:products
      })
      console.log(products); 
  }
  render() {
    return (
      <React.Fragment>
        <p className={styles.header}>Showcase New Products</p>

        <div className={styles.newProducts}>
          {this.state.newProducts ? (
            <div className={styles.products}>
              {this.state.newProducts.map((product) => (
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
              onClick={() => this.createProductsFromIds(this.state.searchInput)}
            >
              ADD
            </button>
            <button
              onClick={() => this.submitProducts()}
              className={styles.submit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditNewProducts