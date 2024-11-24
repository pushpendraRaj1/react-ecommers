import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Econtext } from './context/MainContext';
import Swal from 'sweetalert2';


export default function ProductDetails() {
  let { WishP, setWishP } = useContext(Econtext);
  console.log(WishP);

  const [singleData, setSingleData] = useState();
  const [smallImg, setSmallImg] = useState([]);
  const [bigImg, setBigImg] = useState("");
  const urlId = useParams().id;

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${urlId}`)
      .then((response) => {
        setSingleData(response.data);
        setBigImg(response.data.thumbnail);
        setSmallImg(response.data.images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [urlId]); // Add urlId as a dependency

  const addWish = (item) => {
    const existingProductInWishlist = WishP.find((product) => product.title === item.title);
    if (existingProductInWishlist) {
      Swal.fire({
        title: 'Item already in wishlist!',
        text: `${item.title} is already in your wishlist.`,
        icon: 'info',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      let newObj = {
        thumbnail: item.thumbnail,
        brand: item.brand,
        category: item.category,
        price: item.price,
        title: item.title,
        quantity: 1
      };
      setWishP([...WishP, newObj]);
      Swal.fire({
        title: 'Added to Wishlist!',
        text: `${item.title} has been added to your wishlist.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  if (!singleData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div>
              <div className="h-64 md:h-80 rounded-lg mb-4">
                <img
                  src={bigImg}
                  alt="Product Image"
                  className="h-[300px] hover:scale-110 transition duration-300"
                />
              </div>
              <div className="w-full flex">
                {smallImg.length > 0 ? (
                  smallImg.map((image) => (
                    <div
                      key={image}
                      className="h-[120px] bg-white m-[5px] p-[5px]"
                      onClick={() => setBigImg(image)}
                    >
                      <img src={image} alt="Product Image" className="h-[150%]" />
                    </div>
                  ))
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-white-800 text-2xl md:text-3xl">
              {singleData.title}
            </h2>
            <p className="text-white-500 text-sm">
              By <a href="#" className="text-red-400 hover:underline">{singleData.brand}</a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">{singleData.price}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">{singleData.discountPercentage}%</p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>

            <div className="flex py-4 space-x-4">

              <button onClick={() => addWish(singleData)} type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}