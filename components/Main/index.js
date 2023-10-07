import React, { useState }  from 'react';
import 'tailwindcss/tailwind.css';
import MyFooter from '../Footer';
function Home() {
  
  const [data, setData] = useState([
    {
      date: '2023-08-25',
      address: '0x12345...',
      amountUSDT: 1000,
      amountWToken: 500,
    },
    // add more data...
  ]);

  return (
    <div>
      
      <div className="justify-center flex mt-20 text-base ">
      xxxxxxxx (Intro to WBF mechanism)
      </div>

      <div className="justify-center flex mt-20 text-base ">
      <div className=" text-base ">

      </div>

<div  className="justify-center  flex-col  items-center flex mt-20 text-base ">
      <button
      key="{key}"
      type="button"
      className="bg-red-500 hover:bg-red-600
      text-white focus:ring-4 focus:outline-none
         font-medium rounded-lg text-lg 
         px-5 py-3 text-center"
    >
      Mint W Token
    </button>
    <span className="mt-4 text-sm ">Current at 1 $WFB = 1 $USDT</span>
    </div>

</div>


<div className="flex items-center p-4 border-b border-gray-300 mt-20 px-80">
      <div className="w-1/4">
        <p className="font-bold">Date</p>
      </div>
      <div className="w-1/4">
        <p className="font-bold">Address</p>
      </div>
      <div className="w-1/4">
        <p className="font-bold">Amount of USDT</p>
      </div>
      <div className="w-1/4">
        <p className="font-bold">Amount of W Token</p>
      </div>
    </div>
    {data.map((item, index) => (
      <div className="flex items-center p-4 border-b border-gray-300 px-80" key={index}>
        <div className="w-1/4">
          <p>{item.date}</p>
        </div>
        <div className="w-1/4">
          <p>{item.address}</p>
        </div>
        <div className="w-1/4">
          <p>${item.amountUSDT}</p>
        </div>
        <div className="w-1/4">
          <p>{item.amountWToken}$WFB</p>
        </div>
      </div>
    ))}


      {/* <MyFooter></MyFooter> */}
    </div>
  );
}

export default Home;
