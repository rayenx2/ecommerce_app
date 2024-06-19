import Image from 'next/image';
import React from 'react';
import { List } from 'lucide-react';
import Link from 'next/link';

function ProductItem({ product }) {
  // Destructure the necessary attributes from the product
  const { id, attributes } = product;
  const { image } = attributes || {};
  const imageData = image?.data || [];


  // Take the first image from the imageData array
  const firstImage = imageData[0];

  // Destructure the necessary image attributes
  const { url, name } = firstImage?.attributes || {};
  

  return (
    <Link href={'/product-detail/'+product.id } >
    <div className='p-1 border-primary rounded-lg hover:border hover:shadow-md hover:cursor-pointer' >
        
    
        {url ? (
          <Image
            src={url}
            alt={name || 'Product Image'} // Providing alt text for accessibility
            width={400} // Adjust width as per your requirement
            height={350} // Adjust height as per your requirement
            className='rounded-t-lg h-{170px} object-cover '
          />
        ) : (
          <div>No image available</div>
        )}
      
      <div className=' flex items-center justify-between bg-gray-50 p-3 rounded-b-lg ' >
        <div>
        <h2 className='text-{14px} font-meduim line-clamp-2' >{attributes.title}</h2>
        <h2 className='text-{12px} text-gray-400 flex gap-2 items-center' >
        <List className='h-3 w-4' /> {attributes.category} </h2>
        <div >
        <h2 className=' font-medium' >{attributes.price} DT </h2>
        </div>
        </div> 
        </div>
    </div>
    </Link >
  );
}

export default ProductItem;
