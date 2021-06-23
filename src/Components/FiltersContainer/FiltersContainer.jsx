import React from "react";
import styles from "./FiltersContainer.module.scss";
import Filter from "./Filter/Filter";

const FiltersContainer = (props)=>{
    return(
        <div className={styles.FiltersContainer}>

           {props.filters.map(filter=> <Filter name={filter.englishName}/>)}
        </div>
    )
}

export default FiltersContainer