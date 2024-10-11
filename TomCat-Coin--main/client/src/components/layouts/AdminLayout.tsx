import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className='bg-black min-h-screen'>
            <div className="navbar bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <Link className='font-tektur text-xl text-white text-opacity-60' to={'/auth/0/admin'}>User</Link>
                            <Link className='font-tektur text-xl text-white text-opacity-60' to={'/auth/0/admin/task'}>Task</Link>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6">
                        <Link className='font-tektur text-xl text-white text-opacity-60' to={'/auth/0/admin'}>User</Link>
                        <Link className='font-tektur text-xl text-white text-opacity-60' to={'/auth/0/admin/task'}>Task</Link>

                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;