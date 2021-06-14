import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Orders from "./pages/Orders/Orders"
class App extends Component {
  state={
    orders:[{id:1,date:"2021/11/06",productprice:250,shipmentPrice:450,totalPrice:290,shipmentStatus:"deliverd",paymentMethod:"credit card",paymentStatus:"paid",details:{
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
  }},{id:4,date:"2020/05/20",productprice:150,shipmentPrice:140,totalPrice:290,shipmentStatus:"deliverd",paymentMethod:"cash on delivery",paymentStatus:"paid",details:{
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
  }},
  {id:9,date:"2019/01/31",productprice:50,shipmentPrice:40,totalPrice:90,shipmentStatus:"ready for delivery",paymentMethod:"credit card",paymentStatus:"paid",details:{
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
  }},{id:4,date:"2022/08/10",productprice:950,shipmentPrice:570,totalPrice:290,shipmentStatus:"ready for shipping",paymentMethod:"cash on delivery",paymentStatus:"paid",details:{
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
  }},{id:4,date:"2021/06/11",productprice:950,shipmentPrice:570,totalPrice:290,shipmentStatus:"ready for shipping",paymentMethod:"cash on delivery",paymentStatus:"paid",details:{
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
  }}

]
  }
  render(){
    return (
    <React.Fragment>

   <Route exact path={process.env.PUBLIC_URL + '/'} component={() => <Homepage />}/>
   <Route exact path={process.env.PUBLIC_URL + '/orders'} component={() => <Orders orders={this.state.orders} />}/>


   </React.Fragment>
  );
  }
  
}

export default App;
