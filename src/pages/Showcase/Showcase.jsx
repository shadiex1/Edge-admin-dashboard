import React,{Component} from "react";
import styles from "./Showcase.module.scss";
import Menu from "../../Components/Menu/Menu";
import EditSliderImgs from "../../Components/EditSliderImgs/EditSliderImgs";
import EditNewProducts from "../../Components/EditNewProducts/EditNewProducts";

class Showcase extends Component {
    state = {
        files: [],
        showSlider:false,
        showNewProducts:false
      };
  
    // fileSelectedHandler = (e) => {
    //     this.setState({ files: [...this.state.files, ...e.target.files] })
    //   }
      showSliderHandler=()=>{
        this.setState({
          showSlider:true,
          showNewProducts:false
        })
      }
      showNewProductsHandler=()=>{
        this.setState({
          showNewProducts:true,
          showSlider:false,

        })
      }

//     deleteImgHandler=(img)=>{
//       const files=[...this.state.files]
//       const index = files.indexOf(img);
// if (index > -1) {
//   files.splice(index, 1)
//   this.setState({
//     files
//   })
// }

//     }
    render(){
        
        return(
            <div className={styles.Showcase}>
<Menu/>

    

<div className={styles.OrderFilter}>
            
                <button style={this.state.showSlider ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.showSliderHandler()}>Slider Images</button>
                <button style={this.state.showNewProducts ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.showNewProductsHandler()} >New Products</button>
            
        </div>
       {this.state.showSlider && <EditSliderImgs imgs={this.props.imgs}/>}
       {this.state.showNewProducts && <EditNewProducts AddNewProducts={(id)=>this.props.AddNewProducts(id)} DeleteNewProduct={this.props.DeleteNewProduct} newProducts={this.props.newProducts}/>}
       

            </div>
        )
    }
}

export default Showcase