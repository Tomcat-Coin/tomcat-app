import { useTonConnectUI } from "@tonconnect/ui-react";
import premium_icon from "../assets/prem.svg";
import { PiHandWithdrawFill } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { HiMiniGift } from "react-icons/hi2";
import { useState } from "react";
const WalletConnect = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [modal, setModal] = useState(false);
    console.log(tonConnectUI);

    return (
        <div className="min-h-[85vh]">

            <dialog open={modal} id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Withdraw is unable!</h3>
                    <p className="py-4">Withdrawal will be unlocked when token lauch and airdrop distributed, make sure you connect your wallet to be eligible for withdrawal!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={()=> setModal(false)}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

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
            <div className="bg-white bg-opacity-10 text-white font-poppins text-sm font-normal w-52 justify-center p-3 rounded-full mx-auto my-2 flex gap-1 items-center" onClick={() => setModal(true)}>
                <PiHandWithdrawFill className="text-xl" />
                Withdraw to wallet
            </div>
            <div className="border-t-2 border-white bg-white bg-opacity-10 rounded-t-3xl h-[50vh] w-full p-3">
                <p className="text-xl font-poppins text-white text-center mt-5">Airdrop Qualifiers</p>
                <p className="text-sm font-poppins text-white text-opacity-70 text-center">Listing and launching soon, all activities are important for qualification!</p>

                <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                    <div className="flex items-center gap-1">
                        <MdAttachMoney className="text-white text-3xl" />
                        <p className="text-white font-poppins">Tasks reward</p>
                    </div>

                    <p className="font-poppins text-xl text-white">14</p>
                </div>

                <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                    <div className="flex items-center gap-1">
                        <HiMiniGift className="text-white text-3xl" />
                        <p className="text-white font-poppins">Mining reward</p>
                    </div>

                    <p className="font-poppins text-xl text-white">14</p>
                </div>
            </div>
        </div>
    );
};

export default WalletConnect;