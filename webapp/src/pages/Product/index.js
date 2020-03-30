import React from 'react';
import { Route } from 'react-router-dom';
import Categories from './Categories';
import Product from './Product';

const Products = ({match}) => (
  <div className="content">
    <Route path={`${match.url}/categories`} component={Categories} />
    <Route path={`${match.url}/beverages`} component={Product} />
  </div>
);

export default Products;