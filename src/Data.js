import axios from "axios";

const ip = "http://18.221.156.111:3001";


export const fetchCategories = () => {
  return axios.get(`${ip}/admin/mobile/category/list`);
};
export const fetchFilters = (ID) => {
  return axios.get(`${ip}/admin/mobile/filter/list`, {
    params: {
      categoryID: ID,
    },
  });
};

export const fetchProducts = (catID, pageIndex, pageSize, filter) => {
  return axios
    .get(`${ip}/admin/mobile/product/list`, {
      params: {
        categoryID: catID,
        pageIndex: pageIndex,
        pageSize: pageSize,
        filterID: filter,
      },
    })
    .then((response) => response.data);
};
export const fetchProduct = (prodId) => {
  return axios
    .get(`${ip}/admin/mobile/product/ByID/`, {
      params: {
        productID: prodId,
      },
    })
    .then((response) => response.data);
};
export const fetchFilter = (filterID) => {
  return axios
    .get(`${ip}/admin/mobile/filter/ByID/`, {
      params: {
        ID: filterID,
      },
    })
    .then((response) => response.data);
};

export const addFilter = (filter) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/filter/add`,
    headers: {},
    data: filter,
  }).then(function (response) {
    //handle success
    if (response.data.status.engError) {
      alert(response.data.status.engError);
    } else {
      alert("filter added succesfully");
    }
  });
};
export const modifyFilter = (filter) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/filter/upd`,
    headers: {},
    data: filter,
  }).then(function (response) {
    //handle success
    if (response.data.status.engError) {
      alert(response.data.status.engError);
    } else {
      alert("filter modified succesfully");
    }
  });
};
export const deleteFilter = (filterID) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/filter/del`,
    headers: {},
    data: {
      ID: filterID,
    },
  }).then(function (response) {
    //handle success
    alert("Filter deleted successfully");
    window.location.reload();
  });
};
export const AddProduct = (product) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/product/add`,
    headers: {},
    data: product,
  }).then(function (response) {
    //handle success
    if (response.data.status.engError) {
      alert(response.data.status.engError);
    } else {
      alert("product added succesfully");
    }
  });
};
export const modifyProduct = (product) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/product/upd`,
    headers: {},
    data: product,
  }).then(function (response) {
    //handle success
    if (response.data.status.engError) {
      alert(response.data.status.engError);
    } else {
      alert("product moodified succesfully");
    }
  });
};
export const deleteProduct = (productID) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/product/del`,
    headers: {},
    data: {
      productID: productID,
    },
  }).then(function (response) {
    //handle success
    alert("Product deleted successfully");
    window.location.reload();
  });
};

export const fetchNewProducts = () => {
  return axios.get(`${ip}/admin/mobile/Home`).then((response) => response.data);
};
export const modifyShowcase = (showcaseOBJ) => {
  axios({
    method: "post",
    url: `${ip}/admin/mobile/Home/upd`,
    headers: {},
    data: showcaseOBJ,
  }).then(function (response) {
    //handle success
    console.log(response);
  });
};
export const fetchOrders = (productID) => {
  return axios.get(`${ip}/admin/order/list`).then((response) => response.data);
};

export const fetchOrder = (id) => {
  return axios
    .get(`${ip}/admin/order/ByID/`, {
      params: {
        ID: id,
      },
    })
    .then((response) => response.data);
};
