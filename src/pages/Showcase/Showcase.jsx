import React,{Component} from "react";
import styles from "./Showcase.module.scss";
import Menu from "../../Components/Menu/Menu";
import EditSliderImgs from "../../Components/EditSliderImgs/EditSliderImgs";
import EditNewProducts from "../../Components/EditNewProducts/EditNewProducts";
import Loading from "../../Components/Loading/Loading";
import { withRouter } from "react-router-dom";

import { fetchNewProducts, modifyShowcase } from "../../Data";
import axios from "axios"
class Showcase extends Component {
  state = {
    imgs: [],
    showSlider: false,
    showNewProducts: true,
    newProducts: null,
    productsIDs: [],
    currentImgs: [],
    fetching: true,
  };

  componentDidMount() {
    fetchNewProducts().then(
      (fetchedData) =>
        this.setState({
          imgs: fetchedData.data.slides,
          newProducts: fetchedData.data.newProducts,
          fetching: false,
        },   ()=> this.pushNewProductsIDs()
)
      // console.log(fetchedData,"al data aheeeeeee")
    );
  }
  // componentDidUpdate() {
  //   console.log(this.state, "state al showcase");
  // }
  pushNewProductsIDs = () => {
    const productsIDs = [];
    this.state.newProducts.forEach((product) =>
      productsIDs.push(product.productID)
    );
    this.setState({ productsIDs });
  };
  uploadImg = (img) => {
    const formData = new FormData();
    // console.log(img,"soraaa")
    formData.append("sampleFile", img, img.name);
    axios.post("http://18.221.156.111:3001/admin/mobile/upload", formData);
  };
  submitImgsHandler = (imgs) => {
    const namesArr = [];
    imgs.forEach((item) => namesArr.push(item.name));

    imgs.forEach((item) => this.uploadImg(item));
    this.pushNewProductsIDs();
    {
      console.log(this.state, "state al show");
    }
    this.setState({
      imgs: namesArr,
    });

    // modifyShowcase({
    //   // newProducts:this.state.newProducts,
    //   slides:namesArr
    // })
    axios({
      method: "post",
      url: "http://18.221.156.111:3001/admin/mobile/Home/upd",
      headers: {},
      data: {
         newProducts:this.state.productsIDs,

        slides: namesArr,
      },
    }).then((response) => {
      //handle success
      if (response.data.status.engError) {
        console.log(response.data.status.engError, this.state);
      } else {
        alert("Showcase updated successfully");
      }
    });
  };
  submitNewProducts = (IDS) => {
    // modifyShowcase({
    //   newProducts: IDS,
    //   slides: this.state.imgs
    // });
    axios({
      method: "post",
      url: "http://18.221.156.111:3001/admin/mobile/Home/upd",
      headers: {},
      data: {
        newProducts: IDS,
        slides: this.state.imgs,
      },
    }).then((response) => {
      //handle success
      if (response.data.status.engError) {
        alert(response.data.status.engError);
      } else {
        alert("Showcase updated successfully");
      }
    });
    this.props.history.push(`${process.env.PUBLIC_URL}/Showcase`);
  };
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
        {this.state.fetching ? (
          <Loading />
        ) : (
          <div>
            {this.state.newProducts && this.state.showNewProducts && (
              <EditNewProducts
                AddNewProducts={(id) => this.submitNewProducts(id)}
                DeleteProduct={(id) => this.props.DeleteNewProduct(id)}
                newProducts={this.state.newProducts}
                submit={(IDS) => this.submitNewProducts(IDS)}
              />
            )}

            {this.state.showSlider && (
              <EditSliderImgs
                changeSliderImgs={(imgs) => this.submitImgsHandler(imgs)}
                imgs={this.state.imgs}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Showcase) 