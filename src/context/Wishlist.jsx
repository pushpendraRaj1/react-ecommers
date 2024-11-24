import React, { useContext } from 'react'


import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';
import { Econtext } from './MainContext';
import Swal from 'sweetalert2';
import { FaHeart } from 'react-icons/fa6';
import { useState, useEffect } from 'react';


export default function Wishlist() {
  const { WishP, setWishP, cartP, setCartP } = useContext(Econtext);

  const addtoCart = (id, items) => {
    const updatedWishP = WishP.filter((v, i) => i !== id);
    setWishP(updatedWishP);
    setCartP([...cartP, items]);
    Swal.fire({
      title: 'Added to Cart!',
      text: `${items.title} has been added to your cart.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleRemoveItem = (id) => {
    const updatedWishP = WishP.filter((item, index) => index !== id);
    setWishP(updatedWishP);
  };


  return (
    <div>
      <Header />

      <div className="container mx-auto mt-10 text-black ">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl flex items-center">
                <FaHeart className="text-blue-800 text-2xl mr-2 animate-pulse" />
                Dream Wishlist
              </h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-blue-600 text-xs uppercase w-2/5">Product Details</h3>

              <h3 className="font-semibold text-center text-blue-600 text-xs uppercase w-1/5 ">Price</h3>

            </div>

            {WishP.length > 0
              ?
              (WishP.map((v, i) => {

                console.log(v)
                return (
                  <div className="flex items-center hover:bg-blue-100 -mx-8 px-6 py-5">
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img className="h-24" src={v.thumbnail} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm"> {v.title} </span>
                        <span className="text-red-500 text-xs"> {v.brand} </span>

                        <a
                          href="#"
                          className="font-semibold hover:text-red-500 text-blue-500 text-xs"
                          onClick={() => handleRemoveItem(i)}
                        >
                          Remove
                        </a>



                      </div>
                    </div>

                    <span className="text-center w-1/5 font-semibold text-sm">$ {v.price.toFixed(2)} </span>



                    <span className="text-center w-1/5 font-semibold text-sm">
                      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => addtoCart(i, v)} > add to cart </button>
                    </span>
                  </div>
                )
              }))
              :
              "No data found in wishlist"
            }




            <Link to={"/"} className="flex font-semibold text-indigo-600 text-sm mt-10">

              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Continue Shopping
            </Link>
          </div>



        </div>
      </div>
      <ToastContainer />
    </div>
  )
}