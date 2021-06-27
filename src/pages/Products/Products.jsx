import React, { Component } from "react";
import styles from "./Products.module.scss";
import Menu from "../../Components/Menu/Menu";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import Product from "../../Components/Product/Product";
import ReactPaginate from 'react-paginate';
import WarningPopup from "../../Components/WarningPopup/WarningPopup";

import {Link} from "react-router-dom"
class Products extends Component{
    state={
        category:"",
        filter:"",
        products:null
    }
    changeFilter=(category,filter)=>{
        // this.setState({
        //     category,
        //     filter
        // })  
        // let filterdProducts=this.props.products.filter((item)=>item.category==category)
        let products=[...this.props.products]
        // if(category == "All"){
        //     this.setState({
        //         products
        //     })
        // }
        if(filter == undefined || filter=="All"){
            if(category == "All"){
                this.setState({
                    products
                })
            }else{
const filtred=products.filter(item=>item.category == category)
            this.setState({products:filtred})}
        }else{
            if(category == "All"){
                this.setState({
                    products
                })
            }else{
                 const filtred = products.filter(item=>item.category == category && item.filter == filter)    
                this.setState({products:filtred})

            }
             

        }
      
    }
    render(){
        return(
            <div className={styles.Products}>

                <Menu/>
                <ProductsFilter changeFilter={(category,filter)=>this.changeFilter(category,filter)} filters={this.props.filters} categories={this.props.categories}/>
                                        {/* <WarningPopup header={"are you sure you want to delete this product"} show/> */}
<div className={styles.productsContainer}>
                {this.state.products ? this.state.products.map(item=><Product DeleteProduct={()=>this.props.DeleteProduct(item.code)} editable deletable filter={item.filter} category={item.category} img={item.img} code={item.code} englishName={item.englishName} arabicName={item.arabicName} price={item.price}/>): this.props.products.map(item=><Product DeleteProduct={()=>this.props.DeleteProduct(item.code)}  editable deletable filter={item.filter} category={item.category} img={item.img} code={item.code} englishName={item.englishName} arabicName={item.arabicName} price={item.price}/>)}

                </div>
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
  <Link to={process.env.PUBLIC_URL+"/AddNewProduct"}>
                <button className={styles.add}>Add Product</button>
                </Link>
            </div>
        )
    }
}

export default Products