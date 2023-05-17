import React, { useContext } from 'react';
import { ProductCardContext } from '../../context/productCardContext';
import { ProductCard } from '../ProductCard/ProductCard';
import './index.sass';

export const AllCardsList = ({ allProducts }) => {
  const { changeLike } = useContext(ProductCardContext);
  return (
    <div className="cards">
      {allProducts.map((product) => {
        return (
          <ProductCard
            key={product._id}
            {...product}
            product={product}
            changeLike={changeLike}
          />
        );
      })}
    </div>
  );
};
