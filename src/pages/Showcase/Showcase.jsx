import React,{Component} from "react";
import styles from "./Showcase.module.scss";
import Menu from "../../Components/Menu/Menu";
import EditSliderImgs from "../../Components/EditSliderImgs/EditSliderImgs";
import EditNewProducts from "../../Components/EditNewProducts/EditNewProducts";
import { fetchNewProducts, modifyShowcase } from "../../Data";
import axios from "axios"
class Showcase extends Component {
  state = {
    imgs: [],
    showSlider: false,
    showNewProducts: true,
    newProducts: null,
    currentImgs:[]
  };

  componentDidMount() {
    fetchNewProducts().then(
      (fetchedData) =>
        this.setState({
          imgs: fetchedData.data.slides,
          newProducts: fetchedData.data.newProducts,
        })
      // console.log(fetchedData,"al data aheeeeeee")
    );
  }
  // componentDidUpdate() {
  //   console.log(this.state, "state al showcase");
  // }
  uploadImg=(img)=>{
    const formData = new FormData();
    // console.log(img,"soraaa")
    formData.append("sampleFile", img, img.name);
    axios.post("http://18.221.156.111:3001/admin/mobile/upload", formData);
  }
  submitImgsHandler=(imgs)=>{
      const namesArr =[]
      imgs.forEach(item=>namesArr.push(item.name))
     
      imgs.forEach(item=>this.uploadImg(item))
      this.setState({
        currentImgs:namesArr
      })
    modifyShowcase({
      newProducts:[1234],
      slides:namesArr
    })
  }
  submitNewProducts=(id)=>{

    modifyShowcase({
      newProducts: [...id],
      slides: this.state.currentImgs
    });

  }
  showSliderHandler = () => {
    this.setState({
      showSlider: true,
      showNewProducts: false,
    });
  };
  showNewProductsHandler = () => {
    this.setState({
      showNewProducts: true,
      showSlider: false,
    });
  };

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
  render() {
    return (
      <div className={styles.Showcase}>
        <Menu />

        <div className={styles.OrderFilter}>
          <button
            style={
              this.state.showNewProducts
                ? { backgroundColor: "#d5293f", color: "#fff" }
                : null
            }
            onClick={() => this.showNewProductsHandler()}
          >
            New Products
          </button>

          <button
            style={
              this.state.showSlider
                ? { backgroundColor: "#d5293f", color: "#fff" }
                : null
            }
            onClick={() => this.showSliderHandler()}
          >
            Slider Images
          </button>
        </div>
        {this.state.newProducts && this.state.showNewProducts && (
          <EditNewProducts
            AddNewProducts={(id) => this.submitNewProducts(id)}
            DeleteProduct={(id) => this.props.DeleteNewProduct(id)}
            newProducts={this.state.newProducts}
          />
        )}

        {this.state.showSlider && (
          <EditSliderImgs
            changeSliderImgs={(imgs) => this.submitImgsHandler(imgs)}
            imgs={this.state.imgs}
          />
        )}
      </div>
    );
  }
}

export default Showcase