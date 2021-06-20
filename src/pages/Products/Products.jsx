import React, { Component } from "react";
import styles from "./Products.module.scss";
import Menu from "../../Components/Menu/Menu";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import Product from "../../Components/Product/Product";
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
                <div className={styles.productsContainer}>
                {this.state.products ? this.state.products.map(item=><Product filter={item.filter} category={item.category} img={item.img} code={item.code} englishName={item.englishName} arabicName={item.arabicName} price={item.price}/>): this.props.products.map(item=><Product filter={item.filter} category={item.category} img={item.img} code={item.code} englishName={item.englishName} arabicName={item.arabicName} price={item.price}/>)}

                </div>
                <button className={styles.add}>Add Product</button>
            </div>
        )
    }
}

export default Products