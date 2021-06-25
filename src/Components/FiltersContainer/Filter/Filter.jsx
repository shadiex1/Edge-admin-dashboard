import react from "react";
import styles from "./Filter.module.scss";
import { CloseIcon,EditIcon } from "../../svg";
import { Link } from "react-router-dom";

const Filter = (props)=>{
    const {id,name}=props
    return(
        <div className={styles.container}>
            <div className={styles.icons}>  
                            <Link 
    to={{ 
    pathname:process.env.PUBLIC_URL+"/AddnewFilter", 
    state: { type: 'Filter',id:id } 
  }}>  


                          <span className={styles.editIcon}><EditIcon/></span>    
</Link>
                <span onClick={props.DeleteFilter} className={styles.closeIcon}><CloseIcon/></span>    
            </div>
                     

            <div className={styles.Filter}>
            {name}
        </div>
        </div>
        
    )
}

export default Filter



            