import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Orders from "./pages/Orders/Orders";
import SingleOrder from './pages/SingleOrder/SingleOrder';
import Showcase from "./pages/Showcase/Showcase";
import CarouselImg1 from "./assets/New folder/greg-rakozy-oMpAz-DN-9I-unsplash.png"
import CarouselImg2 from "./assets/New folder/Image 5@3x.png"
import CarouselImg3 from "./assets/New folder/Image 7@2x.png"
import CarouselImg4 from "./assets/New folder/Mask Group 3.png"
import ProductImg1 from "./assets/New folder/Image 87@3x.png"
import ProductImg2 from "./assets/New folder/Image 89@3x.png"
import ProductImg3 from "./assets/New folder/Image 90@3x.png"
import ProductImg4 from "./assets/New folder/Image 94@3x.png"
class App extends Component {
  state={
    imgs:[CarouselImg1,CarouselImg2,CarouselImg3,CarouselImg4],

    shipmentOptions:["ready for shipping","shipped","delivered"],
    paymentOptions:["pay on delivery","pending","approved"],
    newProducts:[{
      code:"M_B_J_121",
      img:ProductImg1,
      englishName:"Blue Jacket",
      arabicName:"جاكيت ازرق مفتوح",
      price:300
    },{
      code:"W_B_J_145",
      img:ProductImg2,
      englishName:"Jeep Max",
      arabicName:" جيب ماكس ",
      price:230
    }],
    products:[
{  code:"M_B_J_121",
img:ProductImg1,
englishName:"Blue Jacket",
arabicName:"جاكيت ازرق مفتوح",
price:300},{code:"W_B_J_145",
img:ProductImg2,
englishName:"Jeep Max",
arabicName:" جيب ماكس ",
price:230},{code:"123",
img:ProductImg1,
englishName:"Blue Jacket",
arabicName:"جاكيت ازرق مفتوح",
price:300},{code:"55555",
img:ProductImg2,
englishName:"Jeep Max",
arabicName:" جيب ماكس ",
price:230}


    ],
    orders:[{id:1,date:"2021/11/06",productprice:250,shipmentPrice:450,totalPrice:290,shipmentStatus:"deliverd",paymentMethod:"credit card",paymentStatus:"paid",
    products:[{
      p_code:"p_2446",
      englishName:"jeans trousers",
      arabicName:"بنطلون جينز",
      quantity:3,
      washings:2,
      measure:36,
      price:180,
    },{
      p_code:"p_2446",
      englishName:"jeans shoes",
      arabicName:"حذاء جينز",
      quantity:3,
      washings:5,
      measure:36,
      price:180,
    },{
      p_code:"p_2446",
      englishName:"red trousers",
      arabicName:"بنطلون احمر",
      quantity:9,
      washings:2,
      measure:36,
      price:180,
    }],

    shipment:{
      firstName:"zeyad",
      lastName:"ahmed",
      tel:"0111690784",
      email:"zeyad@yahoo.com",
      city:"cairo",
      address:"123 gamal abdelnasser street,helwan,cairo, 3rd floor"

    }
  },{id:4,date:"2020/05/20",productprice:150,shipmentPrice:140,totalPrice:290,shipmentStatus:"deliverd",paymentMethod:"cash on delivery",paymentStatus:"paid",
    products:[{
      p_code:"p_2446",
      englishName:"Short skirt",
      arabicName:"جيب قصير",
      quantity:1,
      washings:2,
      measure:42,
      price:120,
    }],
    shipment:{
      firstName:"ahmed",
      lastName:"hamed",
      tel:"01116941184",
      email:"anakhily@yahoo.com",
      city:"cairo",
      address:"123 gamal abdelnasser street,helwan,cairo, 3rd floor"

    }
  },
  {id:9,date:"2019/01/31",productprice:50,shipmentPrice:40,totalPrice:90,shipmentStatus:"ready for delivery",paymentMethod:"credit card",paymentStatus:"paid",
    products:[{
      p_code:"p_2446",
      englishName:"Short skirt",
      arabicName:"جيب قصير",
      quantity:1,
      washings:2,
      measure:42,
      price:120,
    }],
    shipment:{
      firstName:"ahmed",
      lastName:"hamed",
      tel:"01116941184",
      email:"anakhily@yahoo.com",
      city:"cairo",
      address:"123 gamal abdelnasser street,helwan,cairo, 3rd floor"

    }
  },{id:4,date:"2022/08/10",productprice:950,shipmentPrice:570,totalPrice:290,shipmentStatus:"ready for shipping",paymentMethod:"cash on delivery",paymentStatus:"paid",
    products:[{
      p_code:"p_2446",
      englishName:"Short skirt",
      arabicName:"جيب قصير",
      quantity:1,
      washings:2,
      measure:42,
      price:120,
    }],
    shipment:{
      firstName:"ahmed",
      lastName:"hamed",
      tel:"01116941184",
      email:"anakhily@yahoo.com",
      city:"cairo",
      address:"123 gamal abdelnasser street,helwan,cairo, 3rd floor"

    }
  },{id:4,date:"2021/06/11",productprice:950,shipmentPrice:570,totalPrice:290,shipmentStatus:"ready for shipping",paymentMethod:"cash on delivery",paymentStatus:"paid",
    products:[{
      p_code:"p_2446",
      englishName:"Short skirt",
      arabicName:"جيب قصير",
      quantity:1,
      washings:2,
      measure:42,
      price:120,
    }],
    shipment:{
      firstName:"ahmed",
      lastName:"hamed",
      tel:"01116941184",
      email:"anakhily@yahoo.com",
      city:"cairo",
      address:"123 gamal abdelnasser street,helwan,cairo, 3rd floor"

    }
  }

]
  }
  updateShowcaseImgs=(updatedSliderImgs)=>{
    // URL.createObjectURL(updatedSliderImgs)
    console.log(updatedSliderImgs)  
    ////////////////////////////////////////////// to be continued in api integration 
    // this.setState({
    //   imgs:updatedSliderImgs
    // })
  }

  AddNewProduct=(id)=>{
    const newProducts = [...this.state.newProducts]
    const allProducts=[...this.state.products]

    const requestedProduct = allProducts.find(item=> item.code == id)
    // requestedProduct ? null : alert("sads")
    // console.log(newProducts,"dah ale al id == id")
    if (requestedProduct === undefined){
      alert("Can't Find Product")
    }else  newProducts.find(item=>item.code==id) ? alert("Product already exists") : newProducts.push(requestedProduct)
    this.setState({newProducts})
    
   
  }

  DeleteNewProduct=(id)=>{
    const newProducts=[...this.state.newProducts]
    // const index = newProducts.find(item.code==id).indexOf(img);
    const requestedProduct = newProducts.filter(item=> item.code != id)
   

this.setState({
  newProducts:requestedProduct
})
}

  
  render(){
    return (
    <React.Fragment>

   <Route exact path={process.env.PUBLIC_URL + '/'} component={() => <Homepage />}/>
   <Route exact path={process.env.PUBLIC_URL + '/Orders'} component={() => <Orders orders={this.state.orders} />}/>
   <Route exact path={process.env.PUBLIC_URL + '/Showcase'} component={() => <Showcase AddNewProducts={(id=>this.AddNewProduct(id))} DeleteNewProduct={(id)=>this.DeleteNewProduct(id)} newProducts={this.state.newProducts} changeSliderImgs={(updatedSliderImgs)=>this.updateShowcaseImgs(updatedSliderImgs)} imgs={this.state.imgs} orders={this.state.orders} />}/>
   <Route exact path={process.env.PUBLIC_URL +`/Orders/SingleOrder/:id`} component={() => <SingleOrder orders={this.state.orders} paymentOptions={this.state.paymentOptions}  shipmentOptions={this.state.shipmentOptions}/>}/>    {/* //////// to be refactored */}



   </React.Fragment>
  );
  }
  
}

export default App;
