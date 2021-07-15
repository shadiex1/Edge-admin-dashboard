import axios from "axios";


export const fetchCategories = () => {
      return  axios
        .get("http://18.221.156.111:3001/admin/mobile/category/list")
        
 
    
        }   
  export      const fetchFilters = (ID) => {
      return  axios
        .get("http://18.221.156.111:3001/admin/mobile/filter/list",{params:{
          categoryID:ID
        }})
        // .then((filter) =>
        //   this.setState({
        //     filters: filter.data.data,
        //   })
        // );
 
    
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
export  const fetchFilter = (filterID) => {
        return axios.get("http://18.221.156.111:3001/admin/mobile/filter/ByID/",{params: {
                   ID:filterID       
                 }}).then(response => response.data)


        } 

// export  const fetchCategories = () => {
//         return axios.get("http://18.221.156.111:3001/admin/mobile/category/list").then(response => response.data)


//         }   
export  const addFilter = (filter) => {
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/filter/add",
  headers: {}, 
  data: 
    filter
  
}).then(function (response) {
    //handle success
    if(response.data.status.engError){
      alert(response.data.status.engError)
    }else {
          alert("filter added succesfully")

    }

  })
  .catch( (response)=> {
    //handle error
// alert(response)
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
    if(response.data.status.engError){
      alert(response.data.status.engError)
    }else {
          alert("filter modified succesfully")

    }

  })
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
    alert("Filter deleted successfully")
          window.location.reload();
  })
  // .catch(function (response) {
  //   //handle error
  //   console.log("laaaaa");
  // });;

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
    if(response.data.status.engError){
      alert(response.data.status.engError)
    }else {
          alert("product added succesfully")

    }

  })
        }
        export const modifyProduct=(product)=>{
axios({
  method: 'post',
  url: "http://18.221.156.111:3001/admin/mobile/product/upd",
  headers: {}, 
  data: 
    product
  
}).then(function (response) {
    //handle success
    if(response.data.status.engError){
      alert(response.data.status.engError)
    }else {
          alert("product moodified succesfully")

    }

  })
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
    alert("Product deleted successfully")
          window.location.reload();
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
  

// export const modifyShippment=(id,state)=>{
// axios({
//   method: 'post',
//   url: "http://18.221.156.111:3001/admin/order/state/upd",
//   headers: {}, 
//   data: {
//     ID:id,
//     shippmentState:state
//   }
// }).then(function (response) {
//     //handle success
//     console.log(response);
//   })

//         } 
export const fetchOrder=(id)=>{
// axios({
//   method: 'get',
//   url: "http://18.221.156.111:3001/admin/order/ByID",
//   headers: {}, 
//   data: {
//         ID:id

//   }
  
// }).then(function (response) {
//     //handle success
//     console.log(response);
//   })
        return axios.get("http://18.221.156.111:3001/admin/order/ByID/",{params: {
                   ID:id       
                 }}).then(response => response.data)



        } 
