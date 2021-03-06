import React, { Component } from 'react';
import styles from "./ProductsFilter.module.scss";


class ProductsFilter extends Component{
    state={
        category:"",
        filter:""
    }
  
    render(){
        const {category,filter}=this.state
        const { changeFilter, categories, filters } = this.props;
        return(
          <React.Fragment>

          <div className={styles.banner}>                <h1>Products</h1>
</div>
            <div className={styles.ProductsFilter}>

                <div className={styles.filters}>
                    <div className={styles.filter}> <span className={styles.title}>Category</span> <select
        value={category}
        onChange={e => {
            this.setState({
                category:e.target.value
            })   
            changeFilter(e.target.value)
                

        }}
      >
        <option value="All">All</option>
        {categories.map((option, i) => (
          <option key={i} value={option.ID}>
            {option.engName}
          </option>
        ))}
      </select></div>
      {category &&<div className={styles.filter}> <span className={styles.title}>Filter</span> <select
        value={filter ? filter:"All"}
        onChange={e => {
            this.setState({
                filter:e.target.value
            })     
           changeFilter(category,e.target.value)

        }}
      >
        <option value="All">All</option>
        {this.props.filters.filter(item=>item.categoryID==category).map((option, i) => (
          <option key={i} value={option.ID}>
            {option.engName}
          </option>
        ))}
      </select></div> }
                    
                </div>
            </div>
            </React.Fragment>

        )
    }
}

export default ProductsFilter