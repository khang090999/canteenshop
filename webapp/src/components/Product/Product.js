import React from 'react';

import { Col, Panel } from 'react-bootstrap';

function Product(props) {
  let {
    product,
    addProduct
  } = props;

  return (
    <Col
      lg={4}
      md={4}
      sm={6}>
      <Panel>
        <div className="product-img-wrapper">
          <a href="#">
            <img
              style={{ height: '200px', objectFit: 'cover' }}
              alt={product.name}
              className="img-thumbnail"
              src={product.url_img} />
          </a>
        </div>

        <h5
          className="ellipsis"
          title={product.name}>
          <a href="#">
            {product.name}
          </a>
        </h5>
        <div className="row">
        <div className="col-md-9 col-sm-9 col-lg-9 ">
          <h5 className="text-warning">
            {`${product.price} VND`}
          </h5>
        </div>
        <div className="col-md-3 col-sm-3 col-lg-3">
          <button className="pull-right btn-fill btn-sm btn-rectangle btn-warning" onClick={addProduct}>ADD</button>
        </div>
        </div>
      </Panel>
    </Col>
  );
}

Product.propTypes = {
  product: React.PropTypes.object.isRequired
};

export default Product;