import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';

import { api } from '../../utils/api';

export const ProductPage = ({ setError }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api
      .getProductById(id)
      .then((productData) => setProduct(productData))
      .catch(() => setError(true));
  }, [id]);

  return (
    !!Object.keys(product).length && (
      <Product product={product} />
    )
  );
};
