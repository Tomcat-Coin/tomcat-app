import { FaBookReader, FaMousePointer, FaTelegramPlane, FaUserFriends, FaYoutube } from "react-icons/fa";
import { ITask } from "../../admin/TaskManagement";
import HandleTaskClaimLogic from "./HandleTaskClaimLogic";
import { FaXTwitter } from "react-icons/fa6";
import { MdAddTask } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

const NormalTaskCard = ({ item }: { item: ITask }) => {
    return (
        <div>
            <div className="relative py-4">
                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        {
                            (() => {
                                switch (item?.category) {
                                    case 'visit':
                                        return <FaMousePointer className="text-3xl text-white" />;
                                    case 'x':
                                        return <FaXTwitter className="text-3xl text-white" />;
                                    case 'read':
                                        return <FaBookReader className="text-3xl text-white" />;
                                    case 'telegram':
                                        return <FaTelegramPlane className="text-3xl text-white" />;
                                    case 'invite':
                                        return <FaUserFriends className="text-3xl text-white" />;
                                    case 'youtube':
                                        return <FaYoutube className="text-3xl text-white" />;
                                    case 'boost':
                                        return <GiUpgrade className="text-3xl text-white" />;
                                    default:
                                        return <MdAddTask className="text-3xl text-white" />;
                                }
                            })()
                        }

                        <div className="">
                            <p className="font-ubuntu text-sm text-white capitalize font-medium">{item?.title}</p>
                            <p className="font-ubuntu text-xs text-white capitalize text-opacity-60">+{item?.point} TOMS</p>
                        </div>
                    </div>

                    <div className="">
                        <HandleTaskClaimLogic item={item} />
                    </div>
                </div>

                <div className="absolute bottom-0 w-[80vw] h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0"></div>
            </div>
        </div>
    );
};

export default NormalTaskCard;