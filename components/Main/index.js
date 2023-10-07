import React, { useState }  from 'react';
import 'tailwindcss/tailwind.css';
//import WContract from '../../contracts/src/wtoken';

import MyFooter from '../Footer';
function Home() {
  
  const [usdtAmount, setUsdtAmount] = useState(''); // 输入购买或出售的USDT数量

  const [data, setData] = useState([
    {
      date: '2023-08-25',
      address: '0x12345...',
      amountUSDT: 1000,
      amountWToken: 500,
    },
    {
      date: '2023-08-25',
      address: '0x12345...',
      amountUSDT: 1000,
      amountWToken: 500,
    },
    {
      date: '2023-08-25',
      address: '0x12345...',
      amountUSDT: 1000,
      amountWToken: 500,
    },
    // add more data...
  ]);

  const handleChangeUsdtAmount = (e) => {
    setUsdtAmount(e.target.value);
  };

  // buy W Token
  const buyWToken = async () => {
    try {
      const parsedUsdtAmount = ethers.utils.parseEther(usdtAmount);
      const transaction = await contract.buyTokens(parsedUsdtAmount);
      const receipt = await transaction.wait();

      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error('Error buying W Token:', error);
    }
  };

  // sell W Token
  const sellWToken = async () => {
    try {
      const parsedUsdtAmount = ethers.utils.parseEther(usdtAmount);
      const transaction = await contract.sellTokens(parsedUsdtAmount);
      const receipt = await transaction.wait();

      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error('Error selling W Token:', error);
    }
  };


  return (
    <div>
      
      <div className="justify-center flex mt-20 text-2xl font-bold ">
      WBF mechanism
      </div>

      <div className="justify-center flex mt-20 text-base ">
      <div className=" text-base ">

      </div>

<div  className="justify-center  flex-col  items-center flex  text-base ">



    <label className="font-bold">
        USDT Amount: {" "}
        
        <input type="text" className="text-black px-2 py-1 font-normal" value={usdtAmount} onChange={handleChangeUsdtAmount} />

      </label>
<div className="justify-center flex  ">

<button
onClick={buyWToken}
key="{key}"
type="button"
className="bg-black border-2 border-red-500 text-white hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-3 text-center mt-5 mx-2"
>
Buy W Token
</button>
<button
onClick={sellWToken}
key="{key}"
type="button"
className="bg-black border-2 border-red-500 text-white hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-3 text-center mt-5"
>
Sell W Token
</button>

</div>

    <span className="mt-4 text-sm ">🔥 🔥 🔥  Current at 1 $WFB = 1 $USDT</span>
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
