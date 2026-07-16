import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/notes"
                    className="text-2xl font-bold text-blue-600"
                >
                    Secure Notes
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">

                    <NavLink
                        to="/notes"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        My Notes
                    </NavLink>

                    <NavLink
                        to="/notes/new"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        Create Note
                    </NavLink>

                    {user && (
                        <span className="text-gray-600 hidden md:block">
                            Hi, <strong>{user.username}</strong>
                        </span>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;