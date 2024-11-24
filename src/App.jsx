import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {
  const [allCat, setAllCat] = useState([])
  const [allProduct, setAllProduct] = useState([])
  const [selectedCat, setSelectedCat] = useState(null)

  let showCat = () => {
    axios.get("https://dummyjson.com/products/categories")
      .then((ress) => {
        setAllCat(ress.data)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  let showProduct = (url) => {
    let apiUrl;
    if (url == undefined) {
      apiUrl = "https://dummyjson.com/products?limit=200"
    } else {
      apiUrl = url
    }

    axios.get(apiUrl)
      .then((ress) => {
        setAllProduct(ress.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let singleCat = (url) => {
    showProduct(url)
    setSelectedCat(url)
  }


  useEffect(() => {
    showCat()
    showProduct()
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-[1240px] mx-auto grid grid-cols-[20%_auto] mt-[15px]">
        <div className=" p-[10px]">
          <h3 className='text-[26px] font-bold py-2 text-center'>catagory</h3>

          <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {allCat.map((v, i) => {
              return (
                <li
                  key={i}
                  className={`w-full px-4 py-2 rounded-b-lg ${selectedCat === v.url ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-100 hover:text-gray-800'} transition duration-300 ease-in-out`}
                  onClick={() => singleCat(v.url)}
                >
                  {v.name}
                </li>
              )
            })}
          </ul>

        </div>
        <div className="">
          <h3 className='text-[26px] font-bold py-2 text-center'>product</h3>
          <div className="card grid grid-cols-4 p-[10px] gap-2">
            {allProduct.map((v, i) => {
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:border-gray-400 transition duration-300 ease-in-out">
                  <Link to={`/product/${v.id}`}>
                    <img className="rounded-t-lg" src={v.thumbnail} alt="" />
                  </Link>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{v.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{v.description}</p>

                    <div key={i} className="">
                      <Link to={`/product/${v.id}`}>
                        <button
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => addToWishlist(v)}
                        >
                          more details..
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </>
  )
}

export default App