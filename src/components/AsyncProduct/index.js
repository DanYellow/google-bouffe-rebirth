import React, { Component } from 'react';


import { asyncComponent } from 'react-async-component';

import Product from './Product'

const AsyncProduct = asyncComponent({
  resolve: () => new Promise(resolve =>
    setTimeout(function() {
      resolve(Product);
    }, 4000)
  ),
  LoadingComponent: ({ productId }) => <div>Loading {productId}</div>, // Optional
  ErrorComponent: ({ error }) => <div>{error.message}</div> // Optional
});

export default AsyncProduct;