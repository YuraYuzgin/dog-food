import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './index.css';

export const AllCardsList = ({ userId, allProducts, changeLike }) => {
  return (
    <div className="cards">
      {allProducts.map((product) => {
        return (
          <ProductCard
            key={product._id}
            userId={userId}
            {...product}
            product={product}
            changeLike={changeLike}
          />
        );
      })}
    </div>
  );
};
