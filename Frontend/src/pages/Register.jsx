import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const { data } = await api.post(
                "/auth/register",
                formData
            );
            setFormData("")
            navigate("/login");

            setFormData("")

        } catch (err) {

            setError(
                err.response?.data?.message || "Register Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                {error && (
                    <p className="text-red-500 mb-3">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                />

                <button
                    className="bg-blue-600 text-white w-full p-3 rounded"
                >

                    {loading ? "Logging in..." : "Login"}

                </button>

                <p className="text-center mt-4">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-1"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Register;