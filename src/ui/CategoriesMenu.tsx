import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { categories } from '@/src/utils/categories';
import { useRouter } from 'next/navigation';

const CategoriesMenu = () => {
  const router = useRouter();

  const handleCheckboxChange = async (query: string) => {
    router.push(
      `/games?search=${query}&ordering=-rating&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=1`
    );
  };

  return (
    <div className="grid w-10/12 grid-cols-1 place-items-center justify-items-center gap-x-4 gap-y-8 overflow-auto px-4 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-2">
      {categories?.map((item) => (
        <ImageListItem
          key={item?.name}
          onClick={() => handleCheckboxChange(item.name)}
          className="h-60 max-h-64 w-full overflow-hidden rounded-b-3xl rounded-t-3xl hover:opacity-70"
        >
          {item?.img}
          <ImageListItemBar
            title={item?.name}
            position="top"
            style={{
              borderTopLeftRadius: '25px',
              borderTopRightRadius: '25px',
            }}
            sx={{
              '.MuiImageListItemBar-title': {
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                fontSize: { sm: '30px', md: '32px', lg: '35px' },
                fontFamily: 'Do Hyeon',
                height: '40px',
              },
            }}
          />
        </ImageListItem>
      ))}
    </div>
  );
};

export default CategoriesMenu;
