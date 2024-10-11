import { useTonConnectUI } from "@tonconnect/ui-react";
import { useExtraListQuery, useInviteMutation, useTon_TransectionMutation } from "../../redux/api/ExtraTaskEndpoint";
import toast from "react-hot-toast";


const ExtraTaskCard = () => {
    const [triggerTonTransection] = useTon_TransectionMutation();
    const { data } = useExtraListQuery(undefined);
    const [tonConnectUI] = useTonConnectUI();

    const InviteTask = (refer: number) => {
        const [triggerInvite, { isLoading }] = useInviteMutation();

        const isClaimed = data?.data?.refer?.some((item: { refer: string }) => item?.refer === String(refer));

        return (
            <div className="relative py-4">
                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <svg width="30" height="30" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.56006 8.27307C11.2923 8.27307 12.6966 6.8688 12.6966 5.13654C12.6966 3.40428 11.2923 2 9.56006 2C7.8278 2 6.42353 3.40428 6.42353 5.13654C6.42353 6.8688 7.8278 8.27307 9.56006 8.27307Z" fill="white" />
                            <path d="M14.9931 13.7646C15.0548 14.1933 14.6979 14.5461 14.2649 14.5461L4.85526 14.5461C4.42219 14.5461 4.06537 14.1933 4.12702 13.7646C4.29485 12.5978 4.83543 11.5082 5.6788 10.6649C6.70817 9.6355 8.10431 9.05721 9.56006 9.05721C11.0158 9.05721 12.412 9.6355 13.4413 10.6649C14.2847 11.5082 14.8253 12.5978 14.9931 13.7646Z" fill="white" />
                            <path d="M6.43115 8.45151C6.70795 8.20164 6.64275 7.78212 6.4193 7.48358C5.92954 6.82923 5.63947 6.01676 5.63947 5.13654C5.63947 4.76722 5.44158 4.39626 5.07382 4.36241C5.00191 4.35579 4.92906 4.3524 4.85542 4.3524C3.55623 4.3524 2.50302 5.40561 2.50302 6.7048C2.50302 8.004 3.55623 9.05721 4.85542 9.05721C5.46152 9.05721 6.01408 8.82799 6.43115 8.45151Z" fill="white" />
                            <path d="M5.12441 10.1104C5.2194 10.0154 5.16646 9.85138 5.03226 9.84533C4.97348 9.84267 4.91452 9.84134 4.85543 9.84134C3.8156 9.84134 2.81836 10.2544 2.08309 10.9897C1.5342 11.5386 1.16487 12.2335 1.0129 12.9831C0.926851 13.4075 1.28582 13.762 1.71889 13.762L3.22943 13.762C3.29125 13.762 3.34215 13.7142 3.35095 13.653C3.54276 12.3195 4.16054 11.0743 5.12441 10.1104Z" fill="white" />
                        </svg>

                        <div className="">
                            <p className="font-ubuntu text-sm text-white capitalize font-medium">Invite {refer} friends</p>
                            <p className="font-ubuntu text-xs text-white capitalize text-opacity-60">+{refer}000 TOMS</p>
                        </div>
                    </div>

                    <div className="">
                        {isLoading ? (
                            <button className="px-5 h-fit py-1 font-poppins font-medium bg-white text-black rounded-full">
                                <span className="loading loading-dots loading-md"></span>
                            </button>
                        ) : isClaimed ? (
                            <button className="px-5 h-fit py-1 font-poppins bg-opacity-10 text-opacity-50 text-white font-medium bg-white  rounded-full">
                                Claimed
                            </button>
                        ) : (
                            <button disabled={data?.data?.refer_count < refer ? true : false} onClick={() => triggerInvite(refer)} className={`${data?.data?.refer_count < refer && 'bg-opacity-10 text-opacity-50 text-white'} px-5 h-fit py-1 font-poppins font-medium bg-white text-black rounded-full`}>
                                Start
                            </button>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 w-[80vw] h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0"></div>
            </div>
        );
    };

    const amountInNanotons = (Number(0.2) * 1e9).toString();

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        messages: [
            {
                address: "UQDhQEizW-8YSO6s_Ixtixshq8xNsNqVBZKopj6VnOYmZJzR",
                amount: amountInNanotons
            }
        ]
    };

    const OnclickTransection = async () => {
        try {
            const trx = await tonConnectUI.sendTransaction(transaction);
            if (trx?.boc) {
                console.log(trx);
                triggerTonTransection(undefined);
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
        <div>
            <div className="relative py-4">
                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#fff"></path></svg>

                        <div className="">
                            <p className="font-ubuntu text-sm text-white capitalize font-medium">Make a TON transaction</p>
                            <p className="font-ubuntu text-xs text-white capitalize text-opacity-60">+10000 TOMS</p>
                        </div>
                    </div>

                    <div className="">
                        {
                            data?.data?.trans?.title === "Ton Transection" ?
                                <button className="px-5 h-fit py-1 font-poppins font-medium bg-white bg-opacity-10 text-opacity-50 text-white rounded-full">Claimed</button>
                                :
                                <button onClick={onclickTrans} className="px-5 h-fit py-1 font-poppins font-medium bg-white text-black rounded-full">Start</button>
                        }
                    </div>
                </div>
                <div className="absolute bottom-0 w-[80vw] h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0"></div>
            </div>

            {InviteTask(3)}
            {InviteTask(10)}
            {InviteTask(25)}
            {InviteTask(50)}
            {InviteTask(100)}

        </div>
    );
};

export default ExtraTaskCard;