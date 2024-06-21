"use client";
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../_utils/GlobalApi'
import Breadcrumb from '../../_component/Breadcrumb';
import ProductImage from '../_components/ProductImage';
import ProductInfo from '../_components/ProductInfo';
import ProductList from '../../_component/ProductList';
import { usePathname } from 'next/navigation';

function ProductDetail({params} ) {

    const path=usePathname();
    const [productDetail,setProductDetail]=useState(null);
    const [productList,setProductList]=useState([] )
    useEffect(()=>{
      console.log("product id",params?.productId)
      console.log('product path',path)
      getProductById_();
    },[] )

    const getProductById_=()=>{
        GlobalApi.getProductById(params?.productId).then(resp=>{
            setProductDetail(resp.data.data)
            getProductListByCategory(resp.data.data)
        } )
    }
    const getProductListByCategory = (product) => {
      const category = product?.attributes?.category;
      console.log("Product category:", category);
      GlobalApi.getProductByCategory(category).then((resp) => {
        console.log("Fetched product list by category:", resp?.data?.data);
        setProductList(resp?.data?.data);
      }).catch(error => {
        console.error("Error fetching product list by category:", error);
      });
    };


  return (
    <div className='p-5 py-20 px-10 md:px-28' >
      <Breadcrumb path={path} />
      <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 justify-around gap-5 sm:gap-5' >
        <ProductImage product={productDetail} />
        <ProductInfo product={productDetail} />
      </div>
      <h2 className='font-meduim text-{20px} mb-4 ' >Similar Products</h2>
      <ProductList productList={productList}/>
    </div>
  )
}

export default ProductDetail