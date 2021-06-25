import React from "react";
import styles from "./FiltersContainer.module.scss";
import Filter from "./Filter/Filter";

const FiltersContainer = (props)=>{
    return(
        <div className={styles.FiltersContainer}>

           {props.filters.map(filter=> <Filter DeleteFilter={()=>props.DeleteFilter(filter.id)} id={filter.id} name={filter.englishName}/>)}
        </div>
    )
}

export default FiltersContainer