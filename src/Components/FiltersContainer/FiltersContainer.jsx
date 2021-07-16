import React from "react";
import styles from "./FiltersContainer.module.scss";
import Filter from "./Filter/Filter";
import { deleteFilter } from "../../Data";
const FiltersContainer = (props) => {
const {filters}=props
  return (
    <div className={styles.FiltersContainer}>
      {filters.data ? (
        filters.data.map((filter) => (
          <Filter
            DeleteFilter={() => deleteFilter(filter.ID)}
            id={filter.ID}
            name={filter.engName}
          />
        ))
      ) : (
        <p className={styles.empty}>No products Available</p>
      )}
    </div>
  );
};

export default FiltersContainer;
