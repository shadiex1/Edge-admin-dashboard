import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Orders from "./pages/Orders/Orders";
import SingleOrder from './pages/SingleOrder/SingleOrder';
class App extends Component {
  state={
    shipmentOptions:["ready for shipping","shipped","delivered"],
    paymentOptions:["pay on delivery","pending","approved"],
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
  render(){
    return (
    <React.Fragment>

   <Route exact path={process.env.PUBLIC_URL + '/'} component={() => <Homepage />}/>
   <Route exact path={process.env.PUBLIC_URL + '/Orders'} component={() => <Orders orders={this.state.orders} />}/>
   <Route exact path={process.env.PUBLIC_URL +`/Orders/SingleOrder/:id`} component={() => <SingleOrder orders={this.state.orders} paymentOptions={this.state.paymentOptions}  shipmentOptions={this.state.shipmentOptions}/>}/>    {/* //////// to be refactored */}



   </React.Fragment>
  );
  }
  
}

export default App;
