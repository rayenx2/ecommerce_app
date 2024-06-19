import React from 'react';
import Image from 'next/image';

function ProductImage({ product }) {
    

    const { attributes } = product || {};
    const { image } = attributes || {};
    const imageData = image?.data || [];

    const firstImage = imageData[0];
    const { url, name } = firstImage?.attributes || {};

    
    return (
        <div>
            {url ? (
                <Image
                    src={url}
                    alt={name || 'Product Image'}
                    width={300}
                    height={350}
                    className='rounded-t-lg h-{170px} object-cover'
                    priority
                />
            ) : (
                <div>No image available</div>
            )}
        </div>
    );
}

export default ProductImage;
