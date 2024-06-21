import { CartContext } from '../../_context/CartContext';
import GlobalApi from '../../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs';

import { BadgeCheck, OctagonX, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function ProductInfo({ product }) {

  const {cart,setCart}=useContext(CartContext);


  const {user}=useUser();
  const router = useRouter();
  const onAddToCartClick =()=>{
    
    if (!user) {
      router.push('/sign-in')
      return ;
    }

    else{
      const data = {
        data:{
          userName:user.fullName,
          email:user.primaryEmailAddress.emailAddress,
          products:[product?.id]
        }
      }
      GlobalApi.AddToCart(data).then(resp=>{
        console.log("add to cart",product );
        setCart(oldCart => [
					...oldCart,
					{
            id:resp.data.data,
            product:product

          }
				])
			}).catch(error => {
				console.log('error', error)
			})
		}
  }


  // Check if product or its attributes are undefined/null
  if (!product || !product.attributes) {
    return <div>No product information available</div>;
  }

  // Destructure the necessary attributes from the product
  const { attributes } = product;
  const { title, description, price, category, instantDelivery } = attributes;

  // Ensure description is rendered properly
  let productDescription = '';

  // Check if description is an array and has the expected nested structure
  if (
    Array.isArray(description) &&
    description.length > 0 &&
    Array.isArray(description[0]?.children) &&
    description[0].children.length > 0 
  ) {
    productDescription = description[0].children[0].text;
  }


  return (
    <div>
      <h2 className='text-{20px} font-bold' >{title}</h2>
      <h2 className='text-{15px} mt-5 text-gray-700 ' >{productDescription}</h2>
      <h2 className='text-{35px} mt-5 font-bold  text-primary' >Price: $ {price}</h2>
      <h2 className='text-{15px} text-gray-400 ' >Category: {category}</h2>
      <h2 className='flex gap-2 mt-5 text-gray-600 text-{13px} ' >Instant Delivery: {instantDelivery ? <BadgeCheck className='text-green-500' /> : <OctagonX className='text-red-600 ' /> }
      Eligible for instant Delivery
      </h2>
      <button className='flex gap-2 p-4 bg-primary text-white rounded-lg px-10 mt-5 hover:bg-blue-800 '
      onClick={()=> onAddToCartClick() }
      >
        <ShoppingCart/> Add to Cart </button>
      

    </div>
  );
}

export default ProductInfo;
