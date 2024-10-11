import { useTonConnectUI } from "@tonconnect/ui-react";
import premium_icon from "../assets/prem.svg";
import { PiHandWithdrawFill } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { useState } from "react";
import { useGetFarmingStatusQuery } from "../redux/api/FarmingEndpoint";
import { useBoostingMiningMutation } from "../redux/api/UserEndpoint";
import toast from "react-hot-toast";

const Boosting = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [tonAmount, setTONAmount] = useState<number>();
    const [miningReward, setMiningReward] = useState<number>(0);
    const { data: FarmingDataStatus } = useGetFarmingStatusQuery(undefined);
    console.log(FarmingDataStatus?.data?.setting?.Mining_Rewards);
    const [triggerBoost] = useBoostingMiningMutation();

    const Boost = async () => {
        if (tonAmount as number > 0) {
            triggerBoost({ ton: tonAmount });
        }
    }

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        messages: [
            {
                address: "UQDhQEizW-8YSO6s_Ixtixshq8xNsNqVBZKopj6VnOYmZJzR",
                amount: String(tonAmount)
            }
        ]
    };

    const OnclickTransection = async () => {
        try {
            const trx = await tonConnectUI.sendTransaction(transaction);
            if (trx?.boc) {
                Boost();
            }
        } catch (error) {
            console.error("Error during transaction:", error);
            toast.error("Transection is not complete!")
        }
    };

    const onclickTrans = () => {
        if (tonConnectUI?.connected) {
            OnclickTransection();
        } else {
            toast.error("Your wallet is not connected!")
        }
    }
    return (
        <div className="min-h-[85vh]">

            <img src={premium_icon} alt="prem" className="size-32 mx-auto pt-8" />

            {
                tonConnectUI?.connected ?
                    <div onClick={() => tonConnectUI.openModal()} className={`bg-blue-600 bg-opacity-40 w-52 text-white font-poppins text-sm font-normal flex justify-center items-center p-3 rounded-full mx-auto my-2 gap-1`}>
                        <PiHandWithdrawFill className="text-xl" />
                        {String(tonConnectUI?.account?.publicKey).slice(0, 15) + "..."}
                    </div>
                    :
                    <div onClick={() => tonConnectUI.openModal()} className={`bg-blue-600 bg-opacity-40 w-52 text-white font-poppins text-sm font-normal flex justify-center items-center p-3 rounded-full mx-auto my-2 gap-1`}>
                        <PiHandWithdrawFill className="text-xl" />
                        Connect Wallet
                    </div>
            }
            <div className="border-t-2 border-white bg-white bg-opacity-10 rounded-t-3xl h-[50vh] w-full p-3 mt-5">
                <p className="text-xl font-poppins text-white text-center mt-0">Boost mining</p>
                <p className="text-sm font-poppins text-white text-opacity-70 text-center">Boost your mining to earn more from every mine!</p>

                <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                    <div className="flex items-center gap-1">
                        <MdAttachMoney className="text-white text-3xl" />
                        <p className="text-white font-poppins">Boost Earning</p>
                    </div>

                    <p className="font-poppins text-xl text-white">{miningReward}</p>
                </div>

                <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                    <div className="flex items-center gap-1">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#fff"></path></svg>

                        <p className="text-white font-poppins">TON Amount</p>
                    </div>

                    <input
                        value={tonAmount}
                        onChange={(e) => {
                            const value = e.target.value;
                            const numberValue = Number(value);

                            // Check if the value is a valid number
                            if (!isNaN(numberValue)) {
                                setTONAmount(numberValue);
                                //((1000 / 100)*5)*2
                                setMiningReward(((Number(FarmingDataStatus?.data?.setting?.Mining_Rewards) / 100) * 5) * numberValue);
                            }
                        }}
                        type="text"
                        className="bg-transparent outline-none font-poppins text-white w-20 text-end"
                        placeholder="0.0" />
                </div>
                <div className="flex justify-center items-center">
                    {
                        tonAmount as number > 0 ?
                            < button onClick={onclickTrans} className="bg-yellow-500 text-black font-poppins text-xl px-10 rounded-xl py-2 mt-2">Boost</button> :
                            <button className="bg-white bg-opacity-10 text-white text-opacity-40 font-poppins text-xl px-10 rounded-xl py-2 mt-2">Boost</button>
                    }
                </div>
            </div>
        </div >
    );
};

export default Boosting;