import React, { Component } from "react";
import styles from "./Product.module.scss";
import WarningPopup from "../WarningPopup/WarningPopup";
import { CloseIcon,EditIcon } from "../../Components/svg";
import { deleteProduct, fetchFilter } from "../../Data";
import {Link} from "react-router-dom"

class Product extends Component{
    state={
        showPopup:false,
        category:"",
        filter:""
    }
    // if props = 1 category = men
    componentDidMount(){
      if (this.props.category == 1){
        this.setState({
          category:"Men"
        })
      }else if (this.props.category == 2){
        this.setState({
          category:"Women"
        })
      }else if (this.props.category==3){
        this.setState({
          category:"Kids"
        })
      }

      fetchFilter(this.props.filter).then(filter=>
        this.setState({
          filter:filter.data.engName
        })
        )

    }

    DeleteProduct=(id)=>{
      this.props.DeleteProduct(id);
      this.setState({
        showPopup:false
      })
          // window.location.reload(true);

    }
    render(){
        const {code}=this.props
    return (
      <div className={styles.Product}>
        {this.state.showPopup && (
          <WarningPopup
            accept={()=>this.DeleteProduct(code)}
            cancel={() =>
              this.setState({
                showPopup: false,
              })
            }
            show
            header="Are you sure you want to delete this product"
          />
        )}
        <div className={styles.icons}>
          {this.props.editable && (
            <Link
              to={{
                pathname: process.env.PUBLIC_URL + "/AddnewProduct",
                state: { type: "Product", id: code },
              }}
            >
              {" "}
              <span className={styles.editIcon}>
                <EditIcon />
              </span>
            </Link>
          )}
          {this.props.deletable && (
            <span
              onClick={() =>
                this.setState({
                  showPopup: true,
                })
              }
              className={styles.closeIcon}
            >
              <CloseIcon />
            </span>
          )}
        </div>

        <div className={styles.img}>
          <img src={`http://18.221.156.111:3001/${this.props.img}`} />
        </div>

        <div className={styles.details}>
          <p>
            Product Code : <span>{this.props.code}</span>
          </p>
          <div className={styles.group}>
            <p>
              English Name : <span>{this.props.englishName}</span>
            </p>
            <p>
              Arabic Name : <span>{this.props.arabicName}</span>
            </p>
          </div>

          <p>
            Price : <span>{this.props.price}</span>
          </p>
          <div className={styles.group}>
            <p>
              Category : <span>{this.state.category}</span>
            </p>
            <p>
              Filter : <span>{this.state.filter}</span>
              {console.log(this.props,"al prod")}
            </p>
          </div>
        </div>
      </div>
    );
    }
    
}

export default Product