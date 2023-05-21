import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { api } from '../../utils/api';

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api
      .getProductById(id)
      .then((productData) => setProduct(productData))
      .catch(() => console.log('error'));
  }, [id]);

  const sendReview = useCallback(
    async (data) => {
      api
        .addReviewByIdProduct(product._id, data)
        .then((data) => setProduct({ ...data }))
        .catch(() => console.log('error'));
    },
    [product._id]
  );

  const deleteReview = useCallback(
    async (reviewId) => {
      api
        .deleteReviewById(product._id, reviewId)
        .then((data) => setProduct({ ...data }))
        .catch(() => console.log('error'));
    },
    [product._id]
  );

  return (
    !!Object.keys(product).length && (
      <Product
        product={product}
        sendReview={sendReview}
        deleteReview={deleteReview}
      />
    )
  );
};
