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
        {props.filters.map((filter) => (
          <Filter
            DeleteFilter={() => DeleteFilter(filter.ID)}
            id={filter.ID}
            name={filter.engName}
          />
        ))}
        {console.log(close)}
      </div>
    );
}

export default FiltersContainer