import { useState } from "react";
import { useAllUserListQuery } from "../redux/api/UserEndpoint";
import { TUser } from "../types/type";
import UserInfoUpdate from "../components/modal/UserInfoUpdate";

export interface UserInfoAdminInterface {
    userId: TUser,
    point: number,
    createdAt: string,
    updatedAt: string,
    task_solved: number,
    refer_count: number,
    _id: string,
}
const UserManagement = () => {
    const { data: Userlist, isLoading } = useAllUserListQuery(undefined);
    const [UpdateUserData, setUpdateUserData] = useState<UserInfoAdminInterface | undefined>(undefined);

    function timeSince(date: string | number | Date): string {
        const createAt = new Date(date);  // Convert the input to a Date object
        const now = new Date();
        const seconds = Math.floor((now.getTime() - createAt.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

    // const timeAgo = ;

    return (
        <div>
            <UserInfoUpdate item={UpdateUserData as UserInfoAdminInterface} setUpdateUserData={setUpdateUserData} />
            <div className="overflow-x-auto max-w-5xl mx-auto bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-10">
                {
                    isLoading &&
                    <span className="loading loading-spinner loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
                }

                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>EQ</th>
                            <th>Friends Invite</th>
                            <th>Task Solved</th>
                            <th>Active Since</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Userlist?.data?.map((item: UserInfoAdminInterface, index: number) => (
                                <tr key={index}>
                                    <th>{index + 313}</th>
                                    <td>@{item?.userId?.Username}</td>
                                    <td>{item?.point} EQ</td>
                                    <td>{item?.refer_count}</td>
                                    <td>{item?.task_solved}</td>
                                    <th>{timeSince(item?.createdAt)}</th>
                                    <td className="flex items-center gap-3">
                                        <button className="btn btn-xs" onClick={() => setUpdateUserData(item)}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;