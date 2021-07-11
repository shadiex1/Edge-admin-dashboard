import React, { Component } from "react";
import styles from "./EditNewProducts.module.scss";
import Product from "../Product/Product";


class EditNewProducts extends Component{
    state={
        newProducts:[...this.props.newProducts],
        searchInput:""
    }
    // shouldComponentUpdate(nextProps, nextState) { 
       
    //     return false;
    //   }
    render(){
        const searchInputChangeHandler = (event) => {
            this.setState({searchInput:event.target.value})
          };
         return(    
             
            <React.Fragment>
            <p className={styles.header}>Showcase New Products</p>

        <div className={styles.newProducts}>
            {this.props.newProducts? <div className={styles.products}>  { this.props.newProducts.map(product=><Product deletable DeleteProduct={()=>this.props.DeleteProduct(product.code)}  code={product.productID} img={product.imageURL} englishName={product.engName} arabicName={product.araName} price={product.price} category={product.categoryID} key={product.productID} filter={product.filterID} />) }
            </div>: <div>No Products Availble</div>}
            
            <div className={styles.add}>
                 <input onChange={(e)=>searchInputChangeHandler(e)} placeholder="Product ID" type="text" />

            <button onClick={()=>this.props.AddNewProducts(this.state.searchInput)}>ADD</button>
            </div>
               
            </div>
            </React.Fragment>
    )
    }
   
}

export default EditNewProducts