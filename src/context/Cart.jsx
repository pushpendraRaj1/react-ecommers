import React, { useContext, useEffect, useState } from 'react'

import Header from '../Header'
import { Econtext } from './MainContext'
import { FaShoppingCart } from 'react-icons/fa';

export default function Cart() {
    const { cartP, setCartP, WishP, setWishP } = useContext(Econtext);
  
    const handleRemove = (id) => {
      const updatedCart = cartP.filter((item, index) => index !== id);
      setCartP(updatedCart);
    };
  
    const handleAddToWishList = (id, item) => {
      const updatedCart = cartP.filter((v, i) => i !== id);
      setCartP(updatedCart);
      setWishP([...WishP, item]);
    };
  
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(0);
  
    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleDecrement = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };
  
    const handleUpdate = (id, quantity) => {
      const updatedCart = cartP.map((item, index) => {
        if (index === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setCartP(updatedCart);
    };
  
    useEffect(() => {
      let total = 0;
      cartP.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
    }, [cartP]);
  

    return (
        <div>
            <Header />

            <div class="container mx-auto mt-10 text-black ">
                <div class="flex shadow-md my-10">
                    <div class="w-3/4 bg-white px-10 py-10">
                        <div class="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl  text-blue-700 flex items-center">
                                <FaShoppingCart className="text-2xl text-blue-900 mr-2 animate-bounce" />
                                Shopify Cart
                            </h1>
                            <h2 class="font-semibold text-2xl"></h2>
                        </div>
                        <div class="flex mt-10 mb-5 ">
                            <h3 class="font-bold text-blue-900  text-xs uppercase w-2/5">Product Details</h3>
                            <h3 class="font-bold text-center text-blue-900  text-xs uppercase w-1/5 ">Quantity</h3>
                            <h3 class="font-bold text-center text-blue-900  text-xs uppercase w-1/5 ">Price</h3>
                            <h3 class="font-bold text-center text-blue-900  text-xs uppercase w-1/5 ">Total</h3>
                        </div>
                        {cartP.map((v, i) => {
                            return (
                                <CartBox v={v} i={i} />
                            )
                        })}


                        <a href="#" class="flex font-semibold text-indigo-600 text-sm mt-10">

                            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </a>
                    </div>

                    <Sum />

                </div>
            </div>

        </div>
    )
}


let CartBox = ({ v, i }) => {


    const { cartP, setCartP } = useContext(Econtext)
    const [count, setCout] = useState(v.quantity || 1)

    const handleRemove = () => {
        const updatedCart = cartP.filter((item, index) => index !== i)
        setCartP(updatedCart)
      }
    let dec = () => {
        if (count > 1) {
            setCout(count - 1)
        }

    }
    let inc = () => {
        setCout(count + 1)
    }
    // update-work
    let update = () => {


        let newCart = cartP.map((item, index) => {
            if (index == i) {
                return { ...item, quantity: count }
            }
            return item;

        })
        setCartP(newCart)

    }

    useEffect(() => {
        update()
    }, [count])


    return (
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div class="flex w-2/5">
                <div class="w-20">
                    <img class="h-24" src={v.thumbnail} alt="" />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm"> {v.title} </span>
                    <span class="text-red-500 text-xs"> {v.brand} </span>
                    <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={handleRemove}>Remove</a>                </div>
            </div>

            <div class="flex justify-center w-1/5">
                <svg onClick={dec} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <input class="mx-2 border text-center w-8" type="text" value={count} />

                <svg onClick={inc} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">$ {v.price} </span>
            <span class="text-center w-1/5 font-semibold text-sm">$ {(v.price * count).toFixed(2)} </span>
        </div>
    )
}

let Sum = () => {
    const { cartP, setCartP } = useContext(Econtext)
    const [totals, setTotals] = useState(null)
    let sum;

    let total = () => {
        sum = 0;
        cartP.forEach((v) => {
            sum = sum + (v.price * v.quantity)
        })

        setTotals(Math.round(sum))
    }

    useEffect(() => {
        total()
    }, [cartP])

    return (
        <div id="summary" class="w-1/4 px-8 py-10">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
                <span class="font-semibold text-sm uppercase">Amount</span>
                <span class="font-semibold text-sm"> {totals} $</span>
            </div>
             

            gst : 18%
            <div class="border-t mt-8">
                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span> {((totals) + (totals * 18 / 100)).toFixed(2)} </span>
                </div>
                <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
            </div>
        </div>
    )
}