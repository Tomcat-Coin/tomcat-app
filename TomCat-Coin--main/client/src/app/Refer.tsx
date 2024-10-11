import toast from "react-hot-toast";
import { useFindRefererQuery } from "../redux/api/UserEndpoint";
import ImageWithFallback from "../components/shared/ImageFallback";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";

const Refer = () => {
    const { data: ReferList, isFetching: ReferListLoading } = useFindRefererQuery(undefined);
    const [refer, setRefer] = useState(false);

    // const { data, isFetching } = useReferListQuery(userId);
    return (
        <div className=" p-5 relative min-h-[85vh]">

            {
                refer === true &&
                <div className="relative z-20">
                    <dialog id="my_modal_5" open className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box py-0 pb-5">
                            <div className="my-5 relative w-full flex items-center justify-center">
                                <p className="text-white text-xl text-center">Invite a fren</p>

                                <IoClose onClick={() => setRefer(false)} className="text-2xl absolute right-0 text-white" />
                            </div>

                            <div
                                onClick={() => {
                                    const referCode = ReferList?.data?.me?.ReferCode;
                                    const shareText = `Join me on TOMS Crypto and let's earn together! Use my invite link to join the fun. 🌟`;
                                    const shareUrl = `https://t.me/share/url?url=https://t.me/TomCat_robot/app?startapp=${referCode}&text=${encodeURIComponent(shareText)}`;
                                    window.location.href = shareUrl;
                                }}
                                className="w-full p-[1px] rounded-md bg-white bg-opacity-10"
                            >
                                <button className="w-full py-2 rounded-md font-roboto text-white text-xl">Send</button>
                            </div>


                            <div className="w-full p-[1px] mt-3 rounded-md bg-white bg-opacity-10" onClick={() => {
                                toast.success('refer link copyed!');
                                navigator.clipboard.writeText('https://t.me/TomCat_robot/app?startapp=' + ReferList?.data?.me?.ReferCode);
                            }}>
                                <button className="w-full py-2 text-white rounded-md font-roboto text-xl">Copy link</button>
                            </div>
                            <p className="font-roboto text-xl text-white font-medium text-center mt-5 cursor-pointer" onClick={() => setRefer(false)}>Close</p>
                        </div>
                    </dialog>
                </div>
            }

            <div className={`w-full `}>
                <div className="relative">
                    <p className="text-white text-3xl font-poppins font-medium text-center">Invite friends <span className="block">and get more TOMS</span></p>

                    <div className="bg-white bg-opacity-10 p-3 rounded-lg w-full my-3">
                        <div className="flex items-center gap-3">
                            <img src="https://doghousesclonev01.vercel.app/stars2.svg" alt="yello star" className="size-10" />
                            <div className="">
                                <p className="font-poppins text-sm text-white">Invite a friend</p>
                                <p className="font-poppins text-xs text-white text-opacity-60">get 20% of your friend's earnings</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                            <button onClick={() => {
                                const referCode = ReferList?.data?.me?.ReferCode;
                                const shareText = `Join me on TOMS Crypto and let's earn together! Use my invite link to join the fun. 🌟`;
                                const shareUrl = `https://t.me/share/url?url=https://t.me/TomCat_robot/app?startapp=${referCode}&text=${encodeURIComponent(shareText)}`;
                                window.location.href = shareUrl;
                            }}
                                className="flex-[2] btn bg-yellow-500 text-black font-poppins py-2 rounded-xl">Invite friend</button>
                            <button
                                onClick={() => {
                                    toast.success('refer link copyed!');
                                    navigator.clipboard.writeText('https://t.me/TomCat_robot/app?startapp=' + ReferList?.data?.me?.ReferCode);
                                }}
                                className="flex-1 btn bg-white bg-opacity-10 text-white flex justify-center items-center gap-1 font-poppins py-2 rounded-xl"><FaCopy />
                                Copy</button>
                        </div>
                    </div>
                </div>

                <div className="mt-2 w-full">
                    <div className="my-5">
                        <p className="font-poppins text-white font-semibold text-xl mb-5">{ReferList?.data?.refer_list?.length} friend</p>
                        <div className="flex flex-col gap-3">
                            {
                                ReferListLoading ?
                                    <>
                                        <div className="w-full h-16 skeleton"></div>
                                        <div className="w-full h-16 skeleton"></div>
                                        <div className="w-full h-16 skeleton"></div>
                                        <div className="w-full h-16 skeleton"></div>
                                    </>
                                    :
                                    ReferList?.data?.refer_list?.length === 0 ?
                                        (<p className="font-poppins text-center">Here is no friends yet</p>) :
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ReferList?.data?.refer_list?.map((item: any, index: number) => (
                                            <div className="flex  justify-between items-center gap-3 " key={index}>
                                                <div className="flex items-center gap-3">
                                                    <div className="size-9 bg-gray-400 rounded-full">
                                                        <ImageWithFallback name={item?.Name as string} url={`https://t.me/i/userpic/160/${item?.Username}.jpg`} />
                                                    </div>
                                                    <p className="font-roboto text-sm text-white">{item?.Name as string}</p>
                                                </div>
                                            </div>
                                        ))
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Refer;