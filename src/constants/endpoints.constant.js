export const ENDPOINTS = {
  GET_PRODUCTS: (limit, skip) => `/products?limit=${limit}&skip=${skip}`,
  GET_PRODUCT_BY_ID: (itemID) => `/products/${itemID}`,
};
