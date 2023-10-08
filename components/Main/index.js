import React, {useState, useEffect} from 'react';
import 'tailwindcss/tailwind.css';
import * as echarts from 'echarts';

function Home() {

    const [usdtAmount, setUsdtAmount] = useState(''); // 输入购买或出售的USDT数量

    const [data, setData] = useState([
        {
            date: '2023-10-5',
            address: '0x0457be51fa481661815eee979a33ab742f060048',
            amountUSDT: 1000,
            amountWToken: 500
        }, {
            date: '2023-10-6',
            address: '0x0457be51fa481661815eee979a33ab742f060048',
            amountUSDT: 500,
            amountWToken: 200
        }, {
            date: '2023-10-7',
            address: '0x0457be51fa481661815eee979a33ab742f060048',
            amountUSDT: 300,
            amountWToken: 1000
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


    useEffect(() => {
        const myChart = echarts.init(document.getElementById('main'));

        const options = {

            title: {
                text: 'W Token'
            },
            xAxis: {
                type: 'value',
                name: 'Supply',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: 'Price',
                
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    type: 'line',
                    data: [ 0, 50, 100],
                    lineStyle: {
                        color: 'red', 
                    },
                    itemStyle: {
                        color: 'red', 
                    },
                   
                    markPoint: {
                      data: [
                        {
                          type: 'min', // 标记最大值
                          name: 'current price',
                          symbol: 'circle', // 标记点的图标类型，可以根据需求设置
                          symbolSize: 10, // 标记点的大小
                          label: {
                            show: true, // 显示标签
                            formatter: 'current price', // 标签的文本
                          },
                          itemStyle: {
                            color: 'red', // 标记点的颜色
                          },
                        },
              
                      ],
                    }
                    
                },
            ]
        };

        // 使用配置项设置图表
        myChart.setOption(options);

        // 在组件卸载时销毁图表实例，防止内存泄漏
        return() => {
            myChart.dispose();
        };
    }, []); // 确保这是一个空数组以仅运行一次


    return (
        <div>

            <div className="justify-center flex mt-20 text-2xl font-bold ">
                WBF mechanism
            </div>
            <div className="flex flex-col items-center justify-center mt-3 px-80 ">
            <p> We unite women who are making positive impacts around the world. </p>
            <div className="my-3"></div> {/* 再次插入空白div */}
            <p> Support them with tech, entrepreneurship, community and finance.</p>
            <div className="my-3"></div> {/* 再次插入空白div */}
<p> Trying a no treasury model, the stronger the w token gets, the more we can support women impactors. </p></div>
            <div className="justify-center flex ">
                <div>


                    <div id="main" className="w-96 h-64   mx-20 mt-10 "></div>

                </div>

                <div className="justify-center flex mt-20 text-base ">
                    <div className=" text-base "></div>

                    <div className="justify-center  flex-col  items-center flex  text-base ">


                        <label className="font-bold">
                            USDT Amount: {" "}

                            <input type="text" className="text-black px-2 py-1 font-normal"
                                value={usdtAmount}
                                onChange={handleChangeUsdtAmount}/>

                        </label>
                        <div className="justify-center flex  ">

                            <button onClick={buyWToken}
                                key="{key}"
                                type="button"
                                className="bg-black border-2 border-red-500 text-white hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-3 text-center mt-5 mx-2">
                                Mint W Token
                            </button>
                            <button onClick={sellWToken}
                                key="{key}"
                                type="button"
                                className="bg-black border-2 border-red-500 text-white hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-3 text-center mt-5">
                                Burn W Token
                            </button>

                        </div>

                        <span className="mt-4 text-sm ">🔥 🔥 🔥  Current at 1 $WFB = 1 $USDT</span>
                    </div>

                </div>
            </div>
            <div className="text-center text-2xl font-bold mt-10">Mint Record</div>
            <div className="flex items-center p-4 border-b border-gray-300 mt-10 px-80">
              
                <div className="w-1/4">
                    <p className="font-bold">Date</p>
                </div>
                <div className="w-2/4">
                    <p className="font-bold">Address</p>
                </div>
                <div className="w-1/4">
                    <p className="font-bold">Amount of USDT</p>
                </div>
                <div className="w-1/4">
                    <p className="font-bold">Amount of W Token</p>
                </div>
            </div>
            {
            data.map((item, index) => (
                <div className="flex items-center p-4 border-b border-gray-300 px-80"
                    key={index}>
                    <div className="w-1/4">
                        <p>{
                            item.date
                        }</p>
                    </div>
                    <div className="w-2/4">
                        <p>{
                            item.address
                        }</p>
                    </div>
                    <div className="w-1/4">
                        <p>${
                            item.amountUSDT
                        }</p>
                    </div>
                    <div className="w-1/4">
                        <p>{
                            item.amountWToken
                        }$WFB</p>
                    </div>
                </div>
            ))
        }


            {/* <MyFooter></MyFooter> */} </div>
    );
}

export default Home;
