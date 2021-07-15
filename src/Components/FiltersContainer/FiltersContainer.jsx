import React from "react";
import styles from "./FiltersContainer.module.scss";
import Filter from "./Filter/Filter";
import { deleteFilter } from "../../Data";
const FiltersContainer = (props)=>{
    let close=false
    const DeleteFilter=(id)=>{
        deleteFilter(id)
        close=true
    }
    return (
      <div className={styles.FiltersContainer}>
        {props.filters.data ? (
          props.filters.data.map((filter) => (
            <Filter
              DeleteFilter={() => DeleteFilter(filter.ID)}
              id={filter.ID}
              name={filter.engName}
            />
          ))
          // <div>{console.log(props.filters.data,"al ffff")}</div>
        ) : (
          <p className={styles.empty}>{console.log(props.filters)}No products Available </p>
          
        )}
      </div>
    );
}

export default FiltersContainer