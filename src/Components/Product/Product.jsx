import React, { Component } from "react";
import styles from "./Product.module.scss";
import WarningPopup from "../WarningPopup/WarningPopup";
import { CloseIcon,EditIcon } from "../../Components/svg";
import {Link} from "react-router-dom"

class Product extends Component{
    state={
        showPopup:false
    }
    render(){
        const {code}=this.props
    return(
        <div className={styles.Product}> 
{this.state.showPopup && <WarningPopup accept={this.props.DeleteProduct} cancel={()=>this.setState({
    showPopup:false
})} show header="Are you sure you want to delete this product"/>} 
        <div className={styles.icons}>  
         {this.props.editable &&    <Link 
    to={{ 
    pathname:process.env.PUBLIC_URL+"/AddnewProduct", 
    state: { type: 'Product',id:code } 
  }}>  <span className={styles.editIcon}><EditIcon/></span></Link>   }  
                     {this.props.deletable && <span onClick={()=>this.setState({
                         showPopup:true
                     })} className={styles.closeIcon}><CloseIcon/></span>   }  
      
        </div>

                   <div className={styles.img}>

            <img src={this.props.img}/>  
                          </div>

            <div className={styles.details}>
                <p>Product Code : <span>{this.props.code}</span></p>
                <div className={styles.group}>
                     <p>English Name : <span>{this.props.englishName}</span></p>
                <p >Arabic Name : <span>{this.props.arabicName}</span></p>
                </div>
                   
                
                <p>Price : <span>{this.props.price}</span></p>
                <div className={styles.group}>
                     <p>Category : <span>{this.props.category}</span></p>
                <p >Filter : <span>{this.props.filter}</span></p>
                </div>
            </div>
        </div>
    )
    }
    
}

export default Product