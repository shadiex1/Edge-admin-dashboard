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
            {this.props.newProducts? <div className={styles.products}>  { this.props.newProducts.map(product=><Product deletable DeleteNewProduct={()=>this.props.DeleteNewProduct(product.code)}  code={product.code} img={product.img} englishName={product.englishName} arabicName={product.arabicName} price={product.price} />) }
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