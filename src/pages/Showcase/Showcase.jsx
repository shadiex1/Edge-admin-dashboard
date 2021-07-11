import React,{Component} from "react";
import styles from "./Showcase.module.scss";
import Menu from "../../Components/Menu/Menu";
import EditSliderImgs from "../../Components/EditSliderImgs/EditSliderImgs";
import EditNewProducts from "../../Components/EditNewProducts/EditNewProducts";
import { fetchNewProducts } from "../../Data";
class Showcase extends Component {
    state = {
        imgs: [],
        showSlider:false,
        showNewProducts:true,
        newProducts:null
      };
  
    componentDidMount(){
      fetchNewProducts().then((fetchedData) =>
        this.setState({
          imgs: fetchedData.data.slides,
          newProducts:fetchedData.data.newProducts
        })
        // console.log(fetchedData,"al data aheeeeeee")
      );      
    }
    componentDidUpdate(){
            console.log(this.state, "state al showcase");

    }
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
                            <button style={this.state.showNewProducts ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.showNewProductsHandler()} >New Products</button>

                <button style={this.state.showSlider ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.showSliderHandler()}>Slider Images</button>
            
        </div>      
         {this.state.newProducts && this.state.showNewProducts && <EditNewProducts AddNewProducts={(id)=>this.props.AddNewProducts(id)} DeleteProduct={(id)=>this.props.DeleteNewProduct(id)} newProducts={this.state.newProducts}/>}

       {this.state.showSlider && <EditSliderImgs imgs={this.state.imgs}/>}

            </div>
        )
    }
}

export default Showcase