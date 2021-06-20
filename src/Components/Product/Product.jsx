import React from "react";
import styles from "./Product.module.scss";
import { CloseIcon } from "../../Components/svg";


const Product=props=>{
    return(
        <div className={styles.Product}>  
         {props.deletable && <span onClick={props.DeleteNewProduct} className={styles.closeIcon}><CloseIcon/></span>   }  
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