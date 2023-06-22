import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { fetchCurrentProduct } from '../../storage/slices/productsSlice';

export const ProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentProduct(id));
  }, [dispatch, id]);

  const currentProduct = useSelector((state) => state.products.currentProduct);

  return !!Object.keys(currentProduct).length && <Product />;
};
