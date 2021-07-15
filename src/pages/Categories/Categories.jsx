import React, { Component } from "react";
import styles from "./Categories.module.scss";
import Menu from "../../Components/Menu/Menu"
import FiltersContainer from "../../Components/FiltersContainer/FiltersContainer";
import Loading from "../../Components/Loading/Loading"
import { fetchFilters, fetchCategories } from "../../Data";
import {Link} from "react-router-dom"
class Categories extends Component {
  state = {
    showFirstCategory: false,
    showSecondCategory: false,
    showThirdCategory: false,
    categories: null,
    filters: null,
    fetching: true,
  };
  componentDidMount() {
    
    fetchCategories().then((categories) =>
      this.setState({
        categories: categories.data.data,
        fetching: false,
      })
    );
  
   fetchFilters().then((filters) =>
      this.setState({
        filters: filters.data,
        fetching: false,
      })
    );
  }
  showFirstCategoryHandler = () => {
    this.setState({
      showFirstCategory: true,
      showSecondCategory: false,
      showThirdCategory: false,
      fetching:true
    });
  };
  showSecondCategoryHandler = () => {
    this.setState({
      showFirstCategory: false,
      showSecondCategory: true,
      showThirdCategory: false,
      fetching: true,
    });
  };
  showThirdCategoryHandler = () => {
    this.setState({
      showFirstCategory: false,
      showSecondCategory: false,
      showThirdCategory: true,
      fetching: true,
    });
  };

  FiltersContainerHandler = (id) => {
    // this.setState({
    //   fetching: true,
    // });
    fetchFilters(id).then((fetchedFilters) =>
      this.setState({
        filters: fetchedFilters.data,
        fetching: false,
      })
    );

    if (id === 1) {
      this.setState({
        showFirstCategory: true,
        showSecondCategory: false,
        showThirdCategory: false,
      });
    } else if (id === 2) {
      this.setState({
        showFirstCategory: false,
        showSecondCategory: true,
        showThirdCategory: false,
      });
    } else if (id === 3) {
      this.setState({
        showFirstCategory: false,
        showSecondCategory: false,
        showThirdCategory: true,
      });
    }
  };
  render() {
    return (
      <div className={styles.Categories}>
        <Menu />
        {this.state.fetching ? (
          // <div> {console.log(this.state.categories, "al stare")}
          <Loading />
          // </div>
        ) : ( this.state.categories && 
          <div>
            {" "}
            <div className={styles.categoriesFilter}>
              <button
                style={
                  this.state.showFirstCategory
                    ? { backgroundColor: "#d5293f", color: "#fff" }
                    : null
                }
                onClick={() =>
                  this.FiltersContainerHandler(
                    1,
                    this.state.categories[0].engName
                  )
                }
              >
                {this.state.categories[0].engName}
              </button>
              <button
                style={
                  this.state.showSecondCategory
                    ? { backgroundColor: "#d5293f", color: "#fff" }
                    : null
                }
                onClick={() =>
                  this.FiltersContainerHandler(
                    2,
                    this.state.categories[1].engName
                  )
                }
              >
                {this.state.categories[1].engName}
              </button>
              <button
                style={
                  this.state.showThirdCategory
                    ? { backgroundColor: "#d5293f", color: "#fff" }
                    : null
                }
                onClick={() =>
                  this.FiltersContainerHandler(
                    3,
                    this.state.categories[2].engName
                  )
                }
              >
                {this.state.categories[2].engName}
              </button>
            </div>
         
            {this.state.filters &&
              <FiltersContainer
                DeleteFilter={(id) => this.props.DeleteFilter(id)}
                filters={this.state.filters}
              />
  }
        
          </div>
        )}
            <Link to=
        {{
          pathname: process.env.PUBLIC_URL + `/Add/Filter`,

        }}
        >
          <button className={styles.add}>Add Filter</button>
        </Link>
      </div>
    );
  }
}

export default Categories