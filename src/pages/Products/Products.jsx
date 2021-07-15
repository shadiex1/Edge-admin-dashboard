import React, { Component } from "react";
import styles from "./Products.module.scss";
import Menu from "../../Components/Menu/Menu";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import Product from "../../Components/Product/Product";
import Loading from "../../Components/Loading/Loading"
import ReactPaginate from 'react-paginate';
import WarningPopup from "../../Components/WarningPopup/WarningPopup";
import Axios from "axios"
import {Link} from "react-router-dom";
import { fetchProducts,      deleteProduct,fetchCategories,fetchFilters
 } from "../../Data";
import axios from "axios";
class Products extends Component {
  state = {
    category: "",
    filter: "",
    products: null,
    filters:null,
    fetching:true,
    categories:null
  };
  changeFilter = (category, filter) => {
    // this.setState({
    //     category,
    //     filter
    // })
    // let filterdProducts=this.props.products.filter((item)=>item.category==category)
    let products = [...this.state.products];
    // console.log(category,filter,"hagtk")
    this.setState({
      fetching:true
    })
    if(category == "All"){
       fetchProducts().then((fetchedProducts) =>
  this.setState({
    products: fetchedProducts.data,
    fetching:false
  }))
    }
    if (filter == undefined || filter == "All") {
      if (category == "All") {
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
        // const filtred = products.filter((item) => item.category.id == category.id);
        // this.setState({ products: filtred });
      }
    } else {
      if (category == "All") {
          fetchProducts(null, 0.6).then((fetchedProducts) =>
            this.setState({
              products: fetchedProducts.data,
              fetching: false,
            })
          );
      } else {
        // const filtred = products.filter(
        //   (item) => item.category == category && item.filter == filter
        // );
        // this.setState({ products: filtred });
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
    // const fetchData = () => {
      fetchProducts()
        .then((products) =>
          this.setState({
            products: products.data,
            fetching: false,
          })
        );
 
          fetchCategories().then((categories)=>this.setState({
            categories:categories.data.data,
            fetching:false
          }))
          fetchFilters().then((filters)=>this.setState({
            filters:filters.data.data,
            
          }))
        // }   
        //  fetchData();

  }
  render() {
    return (
      <div className={styles.Products}>
        <Menu />
        {this.state.categories && (
          <ProductsFilter
            changeFilter={(category, filter) =>
              this.changeFilter(category, filter)
            }
            filters={this.state.filters}
            categories={this.state.categories}
          />
        )}
        {/* <WarningPopup header={"are you sure you want to delete this product"} show/> */}
        {this.state.fetching ? (
          <Loading />
        ) : (
          <div className={styles.productsContainer}>
            {this.state.products && this.state.products.length ? (
              this.state.products.map((item) => (
                <Product
                  DeleteProduct={() =>
                    deleteProduct(item.productID)
                  }
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
        {/* <Link 
    to={{ 
    pathname:process.env.PUBLIC_URL+"/Addnew", 
    state: { type: 'Product' } 
  }}>                                         */}
        {/* ////////////////////////// use this for specific filter or product */}
        {/* <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        /> */}
        <Link
          to={{
            pathname: process.env.PUBLIC_URL + `/Add/Product`,

            // state: { type: "Product", id: code },
          }}
        >
          {/* <Link to={process.env.PUBLIC_URL + "/AddNewProduct"}> */}
          <button className={styles.add}>Add Product</button>
        </Link>
      </div>
    );
  }
}

export default Products