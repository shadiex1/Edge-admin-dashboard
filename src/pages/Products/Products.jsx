import React, { Component } from "react";
import styles from "./Products.module.scss";
import Menu from "../../Components/Menu/Menu";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import Product from "../../Components/Product/Product";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
  fetchCategories,
  fetchFilters,
} from "../../Data";
class Products extends Component {
  state = {
    category: "",
    filter: "",
    products: null,
    filters: null,
    fetching: true,
    categories: null,
  };
  changeFilter = (category, filter) => {
   
    let products = [...this.state.products];
    this.setState({
      fetching: true,
    });
    if (category === "All") {
      fetchProducts().then((fetchedProducts) =>
        this.setState({
          products: fetchedProducts.data,
          fetching: false,
        })
      );
    }
    if (filter === undefined || filter === "All") {
      if (category === "All") {
        this.setState({
          products,
          fetching: false,
        });
      } else {
        fetchProducts(category, 0, 6).then((fetchedProducts) =>
          this.setState({
            products: fetchedProducts.data,
            fetching: false,
          })
        );
      }
    } else {
      if (category === "All") {
        fetchProducts(null, 0.6).then((fetchedProducts) =>
          this.setState({
            products: fetchedProducts.data,
            fetching: false,
          })
        );
      } else {
        
        fetchProducts(category, 0, 6, filter).then((fetchedProducts) =>
          this.setState({
            products: fetchedProducts.data,
            fetching: false,
          })
        );
      }
    }
  };
  componentDidMount() {
    fetchProducts().then((products) =>
      this.setState({
        products: products.data,
        fetching: false,
      })
    );

    fetchCategories().then((categories) =>
      this.setState({
        categories: categories.data.data,
        fetching: false,
      })
    );
    fetchFilters().then((filters) =>
      this.setState({
        filters: filters.data.data,
      })
    );
 
  }
  render() {
    const {categories,fetching,products}=this.state
    return (
      <div className={styles.Products}>
        <Menu />
        {categories && (
          <ProductsFilter
            changeFilter={(category, filter) =>
              this.changeFilter(category, filter)
            }
            filters={this.state.filters}
            categories={this.state.categories}
          />
        )}
        {fetching ? (
          <Loading />
        ) : (
          <div className={styles.productsContainer}>
            {products && products.length ? (
              products.map((item) => (
                <Product
                  DeleteProduct={() => deleteProduct(item.productID)}
                  editable
                  deletable
                  filter={item.filterID}
                  category={item.categoryID}
                  img={item.imageURL}
                  code={item.productID}
                  englishName={item.engName}
                  arabicName={item.araName}
                  price={item.price}
                  key={item.productID}
                />
              ))
            ) : (
              <p className={styles.empty}>No products Available </p>
            )}
          </div>
        )}
     
        <Link
          to={{
            pathname: process.env.PUBLIC_URL + `/Add/Product`,
          }}
        >
          <button className={styles.add}>Add Product</button>
        </Link>
      </div>
    );
  }
}

export default Products;
