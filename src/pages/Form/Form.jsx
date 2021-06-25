import React, { Component } from "react";
import styles from "./Form.module.scss";
import Menu from "../../Components/Menu/Menu";
import { withRouter } from "react-router-dom";

class Form extends Component {
  state = {
    id: "",
    eName: "",
    aName: "",
    size: "",
    img: "",
    price: "",
    washings: "",
    color: "",
    description: "",
    category: "",
    filter: "",
    availbleFilters:"",
    edit:null
  };

  componentDidMount() {
 this.editFormHandler()
}

editFormHandler=()=>{

           if(this.props.location.state && this.props.location.state.type=="Filter"){
           const receivedID=this.props.location.state.id
           let filter=[...this.props.filters].find(item=>item.id==receivedID)
           this.setState({
             id:filter.id,
             eName:filter.englishName,
             aName:filter.arabicName,
             category:filter.category,
             edit:true
           })
           }else if (this.props.location.state && this.props.location.state.type=="Product"){
            const receivedID=this.props.location.state.id
            let product=[...this.props.products].find(item=>item.code==receivedID)

                     this.setState({
             id:product.code,
             eName:product.englishName,
             aName:product.arabicName,
             category:product.category,
             price:product.price,
             filter:product.filter,
             img:product.img,
             washings:product.washings,
             color:product.color,
             size:product.size,
             edit:true
           })
           }

}

  handleChange = (e) => {
         const availbleFilters=[...this.props.filters].filter(item=>item.category === this.state.category)
this.editFormHandler()
    
    this.setState({
      [e.target.name]: e.target.value,
      availbleFilters

    });        
        if(this.state.category ){
   const availbleFilters=[...this.props.filters].filter(item=>item.category === this.state.category)
        this.setState({
            availbleFilters
        })

    }
    
        // console.log(availbleFilters,this.state.category,"a30ooo");
    
  };
  fileSelectedHandler = (e) => {
    // this.setState({ img : e.target.file })
    this.setState({
      [e.target.name]: e.target.files[0],
    });
    console.log(e.target.files);
  };

  render() {
    const { type } = this.props;
    return (
      <div className={styles.Form}>
        <Menu />
        {this.state.edit ? <h1>Edit {type}</h1> : <h1>Add New {type}</h1> }
      
        <div className={styles.formGroups}>
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
              {/* {
                        console.log(this.props)
                    } */}

              <input
                type="file"
                name="img"
                id="img"
                onChange={this.fileSelectedHandler}
              />
            {this.state.edit ? <img src={this.state.img}/>:this.state.img &&
                        <img src={URL.createObjectURL(this.state.img)} />   }
                
            </div>
          </div>
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
            {type=="Product" &&   <div>
              <label for="price">price: </label>
              <input
                type="number"
                name="price"
                id="price"
                onChange={this.handleChange}
                value={this.state.price}
              />
            </div>}

          {console.log(this.state,"al state")}
          </div>
          <div className={styles.formGroup}>
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
            {type=="Product" &&<div>
              <label for="washings">Washings : </label>


              <select
              name="washings"
        onChange={e => {
          this.handleChange(e)
        }}
      >
        <option value="">{this.state.washings}</option>
        {this.props.washings.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>

              
            </div> }

            
          </div>
          {type=="Product" &&<> <div className={styles.formGroup}>
            <div>
              <label for="size">Size : </label>
            <select
            name="size"
        onChange={e => {
          this.handleChange(e)
        }}
      >
        <option value="">{this.state.size}</option>
        {this.props.sizes.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
            </div>
            <div>
              <label for="color">Color : </label>





<select
name="color"
        onChange={e => {
          this.handleChange(e)
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
              <label for="description">Description : </label>
              <input
              style={{height:"80px"}} 
                type="text"
                name="description"
                id="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </div>
          </div>
          </>
          }

          
          
          <div className={styles.formGroup}>
            <div>
              <label for="category">Category : </label>
               <select
               name="category"
        onChange={e => {
          this.handleChange(e)
        }}
      >
        <option value="">{this.state.category}</option>
        {this.props.categories.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
            </div>
            {type=="Product" ?  this.state.availbleFilters && <div>
              <label for="filter">Filter : </label>
          <select
          name="filter"
        onChange={e => {
          this.handleChange(e)
        }}
      >
        <option value=""></option>
        { this.state.availbleFilters.map((option, i) => (
          <option key={i} value={option}>
              { option.englishName}
          </option>
        )) }
        
      </select>
            </div>:null}
           
          </div>
        </div>
        <div className={styles.btns}>
          <button onClick={type==="Product" ?()=>this.props.submitProduct(this.state):()=>this.props.submitFilter(this.state)}>Accept</button>
          <button onClick={()=>this.props.history.goBack()}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Form);
