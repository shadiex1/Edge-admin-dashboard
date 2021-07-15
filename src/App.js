import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Orders from "./pages/Orders/Orders";
import SingleOrder from './pages/SingleOrder/SingleOrder';
import Showcase from "./pages/Showcase/Showcase";
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import Form from "./pages/Form/Form";
import CarouselImg1 from "./assets/New folder/greg-rakozy-oMpAz-DN-9I-unsplash.png"
import CarouselImg2 from "./assets/New folder/Image 5@3x.png"
import CarouselImg3 from "./assets/New folder/Image 7@2x.png"
import CarouselImg4 from "./assets/New folder/Mask Group 3.png"
import ProductImg1 from "./assets/New folder/Image 87@3x.png"
import ProductImg2 from "./assets/New folder/Image 89@3x.png"
import ProductImg3 from "./assets/New folder/Image 90@3x.png"
import ProductImg4 from "./assets/New folder/Image 94@3x.png"
import axios from "axios"

class App extends Component {
  state={
    imgs:[CarouselImg1,CarouselImg2,CarouselImg3,CarouselImg4],
    colors:["Blue","White","Black"],
    sizes:["S","M","L","XL","XXL"],
    washings:[1,2,3],
    sizeType:["C","N"],
    shipmentOptions:["Confirmed","Ready for shipping","Shipped","Received","Rejected"],
    categories:["men","women","kids"],
    
    newProducts:[{
      code:"M_B_J_121",
img:ProductImg1,
category:"men",
filter:"jacket",
englishName:"Blue Jacket",
arabicName:"جاكيت ازرق مفتوح",
washings:2,
color:"red",
size:"L",
price:300
    },{
      code:"W_B_J_145",
img:ProductImg2,
englishName:"Jeep Max",
arabicName:" جيب ماكس ",
category:"women",
filter:"jeep",
washings:3,
color:"green",
size:"XL",
price:230
    }],
    products:[
{  code:"M_B_J_121",
img:ProductImg1,
category:"men",
filter:"jacket",
englishName:"Blue Jacket",
washings:3,
color:"green",
size:"XL",
arabicName:"جاكيت ازرق مفتوح",
price:300},{code:"W_B_J_145",
img:ProductImg2,
englishName:"Jeep Max",
arabicName:" جيب ماكس ",
category:"women",
filter:"jeep",
price:230},{code:"123",
img:ProductImg1,
englishName:"Red Tshirt",
arabicName:" تشيرت احمر ",
category:"men",
filter:"shirt",
price:300},{code:"55555",
img:ProductImg2,
englishName:"Orange sneaker",
arabicName:" كوتشي برتقالي ",
washings:3,
color:"orange",
size:"s",
category:"kids",
filter:"sneaker",
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

  componentDidMount(){
     

        //  fetchCategories();
        //  fetchFilters();
    }

  DeleteNewProduct=(id)=>{
    const newProducts=[...this.state.newProducts]
    // const index = newProducts.find(item.code==id).indexOf(img);
    const requestedProduct = newProducts.filter(item=> item.code != id)
   

this.setState({
  newProducts:requestedProduct
})
}
  DeleteProduct=(id)=>{
    const newProducts=[...this.state.products]
    // const index = newProducts.find(item.code==id).indexOf(img);
    const requestedProduct = newProducts.filter(item=> item.code != id)
   
console.log(id)

this.setState({
  products:requestedProduct
})
}
  DeleteFilter=(id)=>{
    const filters=[...this.state.filters]
    const requestedFilter = filters.filter(item=> item.id != id)
   
console.log(requestedFilter,id)
this.setState({
  filters:requestedFilter
})
}

submitProduct=(item)=>{
  const products=[...this.state.products]
  const filterd=products.filter(product=>product.code != item.id)
  const newItem={
    
    code:item.id,
    img:item.img,
    englishName:item.eName,
    arabicName:item.aName,
    washings:item.washings,
    price:item.price,
    color:item.color,
    size:item.size,
    category:item.category,
    filter:item.filter

  }
  filterd.push(newItem)
  this.setState({
    products:filterd
  })
}
submitFilter=(item)=>{
  const filters=[...this.state.filters]
  const filterd=filters.filter(filter=>filter.id != item.id)
  const newItem={
    
    id:item.id,
    img:item.img,
    englishName:item.eName,
    arabicName:item.aName,
    category:item.category,

  }
  filterd.push(newItem)
  this.setState({
    filters:filterd
  })
}
  
  render(){
    return (
    <React.Fragment>

   <Route exact path={process.env.PUBLIC_URL + '/'} component={() => <Homepage />}/>
   <Route exact path={process.env.PUBLIC_URL + '/Orders'} component={() => <Orders orders={this.state.orders} />}/>
   <Route exact path={process.env.PUBLIC_URL + '/Products'} component={() => <Products DeleteProduct={(id)=>this.DeleteProduct(id)} products={this.state.products} filters={this.state.filters} categories={this.state.categories}/>}/>
   <Route exact path={process.env.PUBLIC_URL + '/Categories'} component={() => <Categories DeleteFilter={(id)=>this.DeleteFilter(id)} categories={this.state.categories}filters={this.state.filters}/>} />
   <Route exact path={process.env.PUBLIC_URL + '/Showcase'} component={() => <Showcase AddNewProducts={(id=>this.AddNewProduct(id))} DeleteNewProduct={(id)=>this.DeleteNewProduct(id)} newProducts={this.state.newProducts} changeSliderImgs={(updatedSliderImgs)=>this.updateShowcaseImgs(updatedSliderImgs)} imgs={this.state.imgs} orders={this.state.orders} />}/>
   <Route exact path={process.env.PUBLIC_URL +`/Orders/SingleOrder/:id`} component={() => <SingleOrder orders={this.state.orders} paymentOptions={this.state.paymentOptions}  shipmentOptions={this.state.shipmentOptions}/>}/>    {/* //////// to be refactored */}
   <Route exact path={process.env.PUBLIC_URL +`/AddNewProduct`} component={() => <Form sizeType={this.state.sizeType} submitProduct={item=>this.submitProduct(item)} type="Product" colors={this.state.colors} sizes={this.state.sizes} washings={this.state.washings} categories={this.state.categories} filters={this.state.filters} products={this.state.products}/>}/> 
   <Route exact path={process.env.PUBLIC_URL +`/AddNewFilter`} component={() => <Form submitFilter={item=>this.submitFilter(item)}type="Filter" filters={this.state.filters} categories={this.state.categories}/>}/>  



   </React.Fragment>
  );
  }
  
}

export default App;
