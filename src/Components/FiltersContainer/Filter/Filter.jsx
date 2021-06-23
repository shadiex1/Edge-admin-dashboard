import react from "react";
import styles from "./Filter.module.scss";
import { CloseIcon,EditIcon } from "../../svg";


const Filter = (props)=>{
    return(
        <div className={styles.container}>
            <div className={styles.icons}>       
                          <span className={styles.editIcon}><EditIcon/></span>    

                <span className={styles.closeIcon}><CloseIcon/></span>    
            </div>
                     

            <div className={styles.Filter}>
            {props.name}
        </div>
        </div>
        
    )
}

export default Filter