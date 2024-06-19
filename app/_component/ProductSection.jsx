"use client";
import React, { useEffect , useState  } from 'react'
import ProductList from './ProductList'
import GlobalApi from '../_utils/GlobalApi';

function ProductSection() {
    const [productList,setProductList]=useState([] );
    useEffect(()=>{
        getLatestProducts_();
    },[] ) 
    const getLatestProducts_=()=>{
        GlobalApi.getLatestProducts().then(resp=>{
            console.log(resp.data.data) 
            setProductList(resp.data.data  || []) 

        })
};
    
  return (
    
    <div className='px-10 md:px-20' >
      <h2 className='my-4 text-xl font-bold' >Our Latest Products</h2>
        <ProductList productList={productList} />
    </div>
  )
}

export default ProductSection