import React, { Component } from 'react';
import styles from "./ProductsFilter.module.scss";


class ProductsFilter extends Component{
    state={
        category:"",
        filter:""
    }
    
    // changeCategory=(e)=>{
    //     this.setState({
    //         category:e.target.vlaue
    //     })
    //     this.props.changeFilter(e.target.value)
    //     }
        // changeFilter=(e)=>{
        //     this.setState({
        //         filter:e.target.vlaue
        //     })
        //     this.props.changeFilter(this.state.category,e.target.value)
        // }
    render(){
        // const changeCategory=(e)=>{
        //     this.setState({
        //         category:e.target.vlaue
        //     })
        //     this.props.changeFilter(e.target.value)
        //     }
        return(
            <div className={styles.ProductsFilter}>
                <h1>Products</h1>
                <div className={styles.filters}>
                    <div className={styles.filter}>category <select
        value={this.state.category}
        onChange={e => {
            this.setState({
                category:e.target.value
            })   
            this.props.changeFilter(e.target.value)

                

        }}
      >

{/* const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
    return <li key={igKey}><span style={{textTransfrom:"capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li> */}
        <option value="All">All</option>
        {this.props.categories.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select></div>
      {this.state.category &&<div className={styles.filter}>Filter <select
        value={this.state.filter ? this.state.filter:"All"}
        onChange={e => {
            this.setState({
                filter:e.target.value
            })     
            this.props.changeFilter(this.state.category,e.target.value)

        }}
      >

{/* const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
    return <li key={igKey}><span style={{textTransfrom:"capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li> */}
        <option value="All">All</option>
        {this.props.filters.filter(item=>item.category==this.state.category).map((option, i) => (
          <option key={i} value={option.englishName}>
            {option.englishName}
          </option>
        ))}
      </select></div> }
                    
                </div>
            </div>
        )
    }
}

export default ProductsFilter