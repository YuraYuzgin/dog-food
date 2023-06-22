import React from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import './index.sass';

export const AllCardsList = ({ allProducts, isFavorite }) => {
  
  return (
    <div className="cards">
      {allProducts.map((product) => {
        return (
          <ProductCard
            key={product._id}
            {...product}
            product={product}
            isFavorite={isFavorite}
          />
        );
      })}
    </div>
  );
};
