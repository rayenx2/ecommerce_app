import React, { useContext } from 'react';
import {PaymentElement,useStripe,useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';
import GlobalApi from '../../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { CartContext } from '../../_context/CartContext';


const CheckoutForm = ({amount} ) => {
  
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
	const [errormessage, setErrorMessage] = useState()
  const {user}=useUser();
  const {cart,setCart}=useContext(CartContext); 
  

 
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const handleError = (error) => {
        setLoading(false)
        setErrorMessage(error.message)
      }

       // Trigger form validation and wallet collection
  const {error: submitError} = await elements.submit();
  if (submitError) {
    handleError(submitError);
    return;
  }
  createOrder();

      const res=await fetch('/api/create-intent',{
        method:'POST',
        body:JSON.stringify({
          amount:amount
        } )
      } )

      const clientSecret=await res.json();
  
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret:clientSecret, 
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirm",
        },
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };

    const createOrder=()=>{
      let productIds=[];
      cart.forEach(element => {
        productIds.push(element?.product?.id)
      });
      const data={
        data:{
          email:user.primaryEmailAddress.emailAddress,
          userName:user.fullName,
          amount:amount,
          products:productIds
        }
      }
      GlobalApi.createOrder(data).then(resp=>{
        if (resp) {
          console.log(resp)
          cart.forEach(element => {
            // GlobalApi.deleteCartItem(element?.id ).then(result=>{
              
            // } )
          });
          
        }

      } )
    } 

  return (
    <form onSubmit={handleSubmit} >
      <div className='px-32 md:mx-[250px] mt-12 ' >
         <PaymentElement />  
         <button className='bg-primary p-2 text-white rounded-md w-full mt-6 hover:bg-blue-500  ' >Submit</button>
      </div>
      
    </form>
  );
};

export default CheckoutForm;