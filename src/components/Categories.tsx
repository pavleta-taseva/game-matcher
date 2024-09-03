import React from 'react';
import CategoriesMenu from '@/src/ui/CategoriesMenu';

const Categories = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center font-doHyeon text-4xl">
      <h1>Browse games</h1>
      <CategoriesMenu />
    </div>
  );
};

export default Categories;
