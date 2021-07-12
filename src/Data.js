import axios from "axios";


export  const fetchFilters = (catID,pageIndex,pageSize) => {
        return axios.get("http://18.221.156.111:3001/admin/mobile/filter/list",{params: {
                   categoryID: catID,
                   pageIndex:pageIndex,
                pageSize:pageSize            
                 }}).then(response => response.data)


        }   
export  const fetchProducts = (catID,pageIndex,pageSize,filter) => {
        return axios.get("http://18.221.156.111:3001/admin/mobile/product/list",{params: {
                   categoryID: catID,
                   pageIndex:pageIndex,
                pageSize:pageSize  ,
                filterID:filter          
                 }}).then(response => response.data)


        }   
export  const fetchProduct = (prodId) => {
        return axios.get("http://18.221.156.111:3001/admin/mobile/product/ByID/",{params: {
                   productID:prodId       
                 }}).then(response => response.data)


        }   
export  const fetchCategories = () => {
        return axios.get("http://18.221.156.111:3001/admin/mobile/category/list").then(response => response.data)


        }   
export  const addFilter = (filter) => {
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/filter/add",
  headers: {}, 
  data: 
    filter
  
}).then(function (response) {
    //handle success
    console.log(response,filter);
  })
  .catch(function (response) {
    //handle error
    console.log("laaaaa");
  });;

        }   
export  const modifyFilter = (filter) => {
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/filter/upd",
  headers: {}, 
  data: 
    filter
  
}).then(function (response) {
    //handle success
    console.log(response,filter);
  })
  .catch(function (response) {
    //handle error
    console.log("laaaaa");
  });;

        }   
export  const deleteFilter = (filterID) => {
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/filter/del",
  headers: {}, 
  data: {
          ID:filterID
  }
    
  
}).then(function (response) {
    //handle success
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log("laaaaa");
  });;

        }   
        export const AddProduct=(product)=>{
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/product/add",
  headers: {}, 
  data: 
    product
  
}).then(function (response) {
    //handle success
    console.log(response,product);
  })
  .catch(function (response) {
    //handle error
    console.log("laaaaa");
  });;
        }
        export const modifyProduct=(product)=>{

        }
        export const deleteProduct=(productID)=>{
          axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/product/del",
  headers: {}, 
  data: {
          productID:productID
  }
    
  
}).then(function (response) {
    //handle success
    console.log(response,"kolh tmam");
  })
  .catch(function (response) {
    //handle error
    console.log("laaaaa");
  });;
        }

  export const fetchNewProducts=(productID)=>{

        return axios.get("http://18.221.156.111:3001/admin/mobile/Home").then(response => response.data)


        }  
    export const modifyShowcase=(showcaseOBJ)=>{
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/Home/upd",
  headers: {}, 
  data: 
    showcaseOBJ
  
}).then(function (response) {
    //handle success
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log("laaaaa");
  });;
        } 
  export const fetchOrders=(productID)=>{

        return axios.get("http://18.221.156.111:3001/admin/order/list").then(response => response.data)


        }  
  

