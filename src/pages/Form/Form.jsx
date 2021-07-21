import React, { Component } from "react";
import styles from "./Form.module.scss";
import Menu from "../../Components/Menu/Menu";
import { withRouter } from "react-router-dom";
import { fetchFilters, fetchCategories, fetchProduct } from "../../Data";
import axios from "axios";
class Form extends Component {
  state = {
    id: "",
    eName: "",
    aName: "",
    img: "",
    price: "",
    washings: [1,2,3], /// to be removed 
    color: "",
    engDescription: "",
    araDescription: "",
    sizeType: "",
    availableSizes: [],
    sizes: [],
    category: "",
    filter: "",
    availbleFilters: null,
    allFilters: null,
    categories: [],
    edit: null,
    categoryName: null,
    filterName: null,
    editImg: false,
    editSizes: true,
  };

  componentDidMount() {
    fetchCategories().then((fetchedCategories) =>
      this.setState({
        categories: fetchedCategories.data.data,
      })
    );
    fetchFilters()
      .then((fetchedFilters) =>
        this.setState({
          allFilters: fetchedFilters.data.data,
        })
      )
      .then(this.editFormHandler);
  }

  fetchFiltersFromCategory = () => {
    const filters = [...this.state.allFilters].filter(
      (item) => item.categoryID === parseInt(this.state.category.ID)
    );
    this.setState({
      availbleFilters: filters,
    });
  };
  editFormHandler = () => {
    if (
      this.props.match.params.id &&
      this.props.match.params.type === "Filter"
    ) {
      const receivedID = this.props.match.params.id;
      
      let filter = this.state.allFilters.find((item) => item.ID == receivedID);
      switch (filter.categoryID) {
        case 1:
          this.setState({
            id: filter.ID,
            eName: filter.engName,
            aName: filter.araName,
            categoryName: "Men",
            category: filter.categoryID,
            edit: true,
          });
          break;
        case 2:
          this.setState({
            id: filter.ID,
            eName: filter.engName,
            aName: filter.araName,
            categoryName: "Women",
            category: filter.categoryID,

            edit: true,
          });
          break;
        case 3:
          this.setState({
            id: filter.ID,
            eName: filter.engName,
            aName: filter.araName,
            categoryName: "Kids",
            category: filter.categoryID,

            edit: true,
          });
          break;
        default:
      }
    } else if (
      this.props.match.params.id &&
      this.props.match.params.type === "Product"
    ) {
      const receivedID = this.props.match.params.id;

      fetchProduct(receivedID).then((product) =>
        this.setState(
          {
            id: product.data.productID,
            eName: product.data.engName,
            aName: product.data.araName,
            category: product.data.categoryID,
            categoryName: product.data.categoryName,
            filterName: product.data.filterName,
            price: product.data.price,
            filter: product.data.filterID,
            img: product.data.imageURL,
            // washings: product.data.details.washings,
            color: product.data.details.color,
            sizes: product.data.details.availableSizes,
            engDescription: product.data.details.engDesc,
            araDescription: product.data.details.araDesc,
            sizeType: product.data.details.sizeType,
            edit: true,
            editImg: true,
            editSizes: false,
          },
          () => {
            if (this.state.sizeType == "N" && this.state.category) {
               fetchFilters(this.state.category).then((fetchedFilters) =>
                 this.setState({
                   availbleFilters: fetchedFilters.data.data,
                   availableSizes: [34, 36, 38, 40, 42, 44, 46, 48],
                 })
               );
             
            } else {
               fetchFilters(this.state.category).then((fetchedFilters) =>
                 this.setState({
                   availbleFilters: fetchedFilters.data.data,
                   availableSizes: ["S", "M", "L", "XL", "XXL"],
                 })
               );
            }
            
          }
        )
      );
    }
  };

  handleChange = (e) => {
    if (e.target.name === "category") { 
      // const filters = [...this.state.allFilters].filter(
      //   (item) => item.categoryID == parseInt(e.target.value)
      // );
      // this.setState({
      //   availbleFilters: filters,
      // });
      fetchFilters(e.target.value).then((fetchedFilters) =>
        this.setState({
          availbleFilters: fetchedFilters.data.data,
        })
      );
    } else if (e.target.name == "sizeType") {
      if (e.target.value == "N") {
        this.setState({
          availableSizes: [34, 36, 38, 40, 42, 44, 46, 48],
          editSizes: true,
          sizes: [],
        });
      } else {
        this.setState({
          availableSizes: ["S", "M", "L", "XL", "XXL"],
          editSizes: true,
          sizes: [],
        });
      }
    } else if (e.target.name == "sizes") {
      let value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      this.setState({ sizes: value });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  availbleSizesOnChange(item) {
    let selected = this.state.sizes;
    let find = selected.indexOf(item);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(item);
    }

    this.setState({ sizes: selected });
  }
  // washingsOnChange(item) {
  //   let selected = this.state.washings;
  //   let find = selected.indexOf(item);

  //   if (find > -1) {
  //     selected.splice(find, 1);
  //   } else {
  //     selected.push(item);
  //   }

  //   this.setState({ washings: selected });
  // }

  fileSelectedHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
      editImg: false,
    });
    console.log(e.target.files);
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append("sampleFile", this.state.img, this.state.img.name);

    axios.post("http://18.221.156.111:3001/admin/mobile/upload", formData);
  };

  submit = () => {
    if (this.props.match.params.type === "Product") {
      if (this.state.edit) {
        ///edit
        axios({
          method: "post",
          url: "http://18.221.156.111:3001/admin/mobile/product/upd",
          headers: {},
          data: {
            productID: this.state.id,
            engName: this.state.eName,
            araName: this.state.aName,
            imageURL: this.state.img.name
              ? this.state.img.name
              : this.state.img,
            price: this.state.price,
            categoryID: this.state.category,
            filterID: this.state.filter,
            details: {
              sizeType: this.state.sizeType,
              availableSizes: this.state.sizes,
              color: this.state.color,
              washings: this.state.washings,
              engDesc: this.state.engDescription,
              araDesc: this.state.araDescription,
            },
          },
        }).then((response) => {
          //handle success
          if (response.data.status.engError) {
            alert(response.data.status.engError);
          } else {
            alert("product updated succesfully");
            this.props.history.push(`${process.env.PUBLIC_URL}/Products`);
          }
        });
        if (this.state.img.editImg) {
          this.onFileUpload();
        }
      } else {
        axios({
          method: "post",
          url: "http://18.221.156.111:3001/admin/mobile/product/add",
          headers: {},
          data: {
            productID: this.state.id,
            engName: this.state.eName,
            araName: this.state.aName,
            imageURL: this.state.img.name,
            price: this.state.price,
            categoryID: this.state.category,
            filterID: this.state.filter,
            details: {
              sizeType: this.state.sizeType,
              availableSizes: this.state.sizes,
              color: this.state.color,
              washings: this.state.washings,
              engDesc: this.state.engDescription,
              araDesc: this.state.araDescription,
            },
          },
        }).then((response) => {
          //handle success
          if (response.data.status.engError) {
            alert(response.data.status.engError);
          } else {
            alert("product added succesfully");
            this.props.history.push(`${process.env.PUBLIC_URL}/Products`);
          }
        });
        if (this.state.img) {
          this.onFileUpload();
        }
      }
    } else if (this.props.match.params.type === "Filter") {
      if (this.state.edit) {
        axios({
          method: "post",
          url: "http://18.221.156.111:3001/admin/mobile/filter/upd",
          headers: {},
          data: {
            ID: this.state.id,
            engName: this.state.eName,
            araName: this.state.aName,
            categoryID: this.state.category,
          },
        }).then((response) => {
          //handle success
          if (response.data.status.engError) {
            alert(response.data.status.engError);
          } else {
            alert("Filter updated successfully");
            this.props.history.push(`${process.env.PUBLIC_URL}/Categories`);
          }
        });
      } else {
        axios({
          method: "post",
          url: "http://18.221.156.111:3001/admin/mobile/filter/add",
          headers: {},
          data: {
            engName: this.state.eName,
            araName: this.state.aName,
            categoryID: this.state.category,
          },
        }).then((response) => {
          //handle success
          if (response.data.status.engError) {
            alert(response.data.status.engError);
          } else {
            alert("Filter added successfully");
            this.props.history.push(`${process.env.PUBLIC_URL}/Categories`);
          }
        });
      }
    }
  };
  render() {
    const { type } = this.props.match.params;
    return (
      <div className={styles.FormContainer}>
        <div className={styles.Form}>
          <Menu />
          {this.state.edit ? <h1>Edit {type}</h1> : <h1>Add New {type}</h1>}

          <div className={styles.formGroups}>
            {type === "Product" && (
              <div className={styles.formGroup}>
                <div>
                  <label for="id">{type} ID :</label>

                  <input
                    type="text"
                    name="id"
                    id="id"
                    onChange={this.handleChange}
                    value={this.state.id}
                    disabled={this.state.edit}
                  />
                </div>
                <div className={styles.img}>
                  <label for="img">{type} image:</label>

                  <input
                    type="file"
                    name="img"
                    id="img"
                    onChange={this.fileSelectedHandler}
                  />
                  {this.state.editImg ? (
                    <img src={`http://18.221.156.111:3001/${this.state.img}`} alt="" />
                  ) : (
                    this.state.img && (
                      <img src={URL.createObjectURL(this.state.img)} alt="" />
                    )
                  )}
                </div>
              </div>
            )}
            <div className={styles.formGroup}>
              <div>
                <label for="eName">English Name: </label>

                <input
                  type="text"
                  id="eName"
                  name="eName"
                  onChange={this.handleChange}
                  value={this.state.eName}
                />
              </div>
              <div>
                <label for="aName">Arabic name : </label>

                <input
                  type="text"
                  name="aName"
                  id="aName"
                  onChange={this.handleChange}
                  value={this.state.aName}
                />
              </div>

            </div>
            {/* <div className={styles.formGroup}>
              {type === "Product" && (
                <div className={styles.checkboxContainer}>
                  <label for="washings">Washings : </label>
                  {this.state.editWashings
                    ? this.props.washings.map((item, i) => {
                        return (
                          <label key={item}>
                            <span>{item}</span>

                            <input
                              onChange={() => this.washingsOnChange(item)}
                              selected={this.state.washings.includes(item)}
                              type="checkbox"
                            ></input>
                          </label>
                        );
                      })
                    : this.state.washings.map((item) => (
                        <p className={styles.checkContainer}>
                          <span>{item}</span>{" "}
                          <span className={styles.check}></span>
                        </p>
                      ))}
                  {}
                  {!this.state.editWashings && (
                    <button
                      className={styles.reset}
                      onClick={() =>
                        this.setState({
                          editWashings: true,
                          washings: [],
                        })
                      }
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div> */}  
            {type === "Product" && (
              <>
                {" "}
                <div className={styles.formGroup}>
                  <div>
                    <label for="size">Size type: </label>
                    <select
                      name="sizeType"
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    >
                      <option value="">{this.state.sizeType}</option>
                      {this.props.sizeType.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  {this.state.sizeType && (
                    <div
                      style={{
                        width: this.state.editSizes && "100%",
                      }}
                      className={styles.checkboxContainer}
                    >
                      <label for="availableSizes">Available sizes : </label>
                      {this.state.editSizes
                        ? this.state.availableSizes.map((item, i) => {
                            return (
                              <label key={item}>
                                <input
                                  onChange={() =>
                                    this.availbleSizesOnChange(item)
                                  }
                                  selected={this.state.sizes.includes(item)}
                                  type="checkbox"
                                ></input>
                                <span>{item}</span>
                              </label>
                            );
                          })
                        : this.state.sizes.map((item) => (
                            <p className={styles.checkContainer}>
                              <span>{item}</span>{" "}
                              <span className={styles.check}></span>
                            </p>
                          ))}
                      {}{" "}
                      {!this.state.editSizes && (
                        <button
                          className={styles.reset}
                          onClick={() =>
                            this.setState({
                              editSizes: true,
                              sizes: [],
                            })
                          }
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <div>
                    <label for="price">price: </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      onChange={this.handleChange}
                      value={this.state.price}
                    />
                  </div>
                  <div>
                    <label for="color">Color : </label>

                    <select
                      name="color"
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    >
                      <option value="">{this.state.color}</option>
                      {this.props.colors.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <div>
                    <label for="engDescription">English description : </label>
                    <input
                      style={{ height: "80px" }}
                      type="text"
                      name="engDescription"
                      id="engDescription"
                      onChange={this.handleChange}
                      value={this.state.engDescription}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <div>
                    <label for="araDescription">Arabic description : </label>
                    <input
                      style={{ height: "80px" }}
                      type="text"
                      name="araDescription"
                      id="araDescription"
                      onChange={this.handleChange}
                      value={this.state.araDescription}
                    />
                  </div>
                </div>
              </>
            )}
            <div className={styles.formGroup}>
              <div>
                <label for="category">Category : </label>
                <select
                  name="category"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                >
                  <option value="">{this.state.categoryName}</option>
                  {this.state.categories.map((option, i) => (
                    <option key={i} value={option.ID}>
                      {option.engName}
                    </option>
                  ))}
                </select>
              </div>
              {type === "Product"
                ? this.state.category &&
                  this.state.availbleFilters && (
                    <div>
                      <label for="filter">Filter : </label>
                      <select
                        name="filter"
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      >
                        <option value="">{this.state.filterName}</option>
                        {this.state.availbleFilters.map((option, i) => (
                          <option key={i} value={option.ID}>
                            {option.engName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                : null}
            </div>
          </div>
          <div className={styles.btns}>
            <button onClick={() => this.submit()}>Accept</button>
            <button onClick={() => this.props.history.goBack()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Form);
