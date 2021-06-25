import React from "react";
import styles from "./Product.module.scss";
import { CloseIcon,EditIcon } from "../../Components/svg";
import {Link} from "react-router-dom"

const Product=props=>{
    const {code}=props
    return(
        <div className={styles.Product}>  
        <div className={styles.icons}>  
         {props.editable &&    <Link 
    to={{ 
    pathname:process.env.PUBLIC_URL+"/AddnewProduct", 
    state: { type: 'Product',id:code } 
  }}>  <span className={styles.editIcon}><EditIcon/></span></Link>   }  
                     {props.deletable && <span onClick={props.DeleteProduct} className={styles.closeIcon}><CloseIcon/></span>   }  
      
        </div>

                   <div className={styles.img}>

            <img src={props.img}/>  
                          </div>

            <div className={styles.details}>
                <p>Product Code : <span>{props.code}</span></p>
                <div className={styles.group}>
                     <p>English Name : <span>{props.englishName}</span></p>
                <p >Arabic Name : <span>{props.arabicName}</span></p>
                </div>
                   
                
                <p>Price : <span>{props.price}</span></p>
                <div className={styles.group}>
                     <p>Category : <span>{props.category}</span></p>
                <p >Filter : <span>{props.filter}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Product