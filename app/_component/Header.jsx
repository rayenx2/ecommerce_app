"use client";
/* eslint-disable @next/next/no-img-element */
import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../_context/CartContext';
import GlobalApi from '../_utils/GlobalApi';
import Cart from'./Cart';

function Header() {
  const { user } = useUser();
  const [isLogin,setIsLogin]=useState();
  const [openCart,setOpenCart]=useState(false)
  const {cart,setCart}=useContext(CartContext)
  useEffect(()=>{
    setIsLogin(window.location.href.toString().includes('sign-in')  )
  },[] )


  useEffect(()=>{
    user&&getCartItem();
  },[user] )

  const getCartItem=()=>{
    GlobalApi.GetUserCartItem(user.primaryEmailAddress.emailAddress ).then(resp=>{
      const result=resp?.data?.data
      console.log('dvfe',result)
      result.forEach(prd=>{
        setCart(cart=>[...cart,
        {  
          id:prd.id,
          product:prd?.attributes?.products?.data[0]}
        ] )
        console.log('mohsen',prd.attributes.products?.data[0]?.attributes )
      } )
    } )
  }

  return !isLogin&& (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex h-25 max-w-screen-xl items-center gap-10 px-10 sm:px-6 lg:px-8 ">
        <img src="./logo.svg" alt="logo" width={90} height={100} />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                  Explore
                </a>
              </li>
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                  Projects
                </a>
              </li>
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                  href="/sign-in"
                >
                  Login
                </a>
                <a
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-blue-600 sm:block"
                  href="/sign-up"
                >
                  Register
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <h2 className="flex gap-1 cursor-pointer" >
                  <ShoppingCart  onClick={()=> setOpenCart(!openCart) }  /> ({cart?.length} )
                </h2>
                <UserButton />
                {openCart&&<Cart/>}
              </div>
            )}

            

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
